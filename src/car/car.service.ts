import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModuleNames, PUBLIC_IMAGES_LINK } from 'src/config/server.config';
import ICar from './ICar';
import { CarDetailsRecordOutput, CarRecordInput, CarRecordOutput } from './car_dto';
import * as path from 'path';
import * as fs from 'fs';
import IImage from 'src/image/IImage';
@Injectable()
export class CarService {
    constructor(
        @InjectModel(ModuleNames.Car)
        private readonly CarModel: Model<ICar>,
    ) { }
    public async createCar(record: CarRecordInput
    ) {
        const car = new this.CarModel(record);
        await car.save();
    }
    public async createCars(records: CarRecordInput[]
    ) {
        const car = await this.CarModel.insertMany(records);
    }
    public async findAllCars(): Promise<CarRecordOutput[]> {
        const cars = await this.CarModel.find();
        const cars_output: CarRecordOutput[] = cars.map(car => {
            return this.getCarOutput(car);
        });
        return cars_output;
    }
    public async findOneCar(id: string): Promise<CarDetailsRecordOutput> {
        const car = await this.CarModel.findById(id).exec();
        if (!car)
            throw new NotFoundException(`Car with ID ${id} not found`);
        return this.getCarDetailsOutput(car);
    }
    public async findOneCarRecord(id: string): Promise<ICar> {
        const car = await this.CarModel.findById(id).exec();
        if (!car)
            throw new NotFoundException(`Car with ID ${id} not found`);
        return car;
    }
    public async update(id: string, updateCarDto: ICar): Promise<ICar> {
        const updatedCar = await this.CarModel
            .findByIdAndUpdate(id, updateCarDto, { new: true })
            .exec();
        if (!updatedCar) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        return updatedCar;
    }
    async remove(id: string): Promise<void> {
        const result = await this.CarModel
            .deleteMany()
            // .deleteOne({ _id: id }).exec();

        if (result.deletedCount === 0) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
    }
    async addCarImage(car_id: String, image_link: string): Promise<any> {
        const car = await this.CarModel.findById(car_id);
        if (!car)
            throw new Error('Car not found');
        car.images.push({ link: image_link });
        await car.save();
        return car.images
    }
    async addCarMainImage(car_id: String, image_link: string): Promise<void> {
        const car = await this.CarModel.findById(car_id);
        if (!car)
            throw new Error('Car not found');
        car.main_image.link = image_link
        await car.save();
    }
    async deleteCarImage(carId: string, imageId: string): Promise<IImage[]> {
        const car = await this.CarModel.findById(carId);

        if (!car) {
            throw new NotFoundException('Car not found');
        }

        const imageToDelete = car.images.find((photo) => String(photo.id) === imageId);

        if (!imageToDelete) {
            throw new NotFoundException('Image not found');
        }

        // Delete the image file from the local storage
        const imagePath = path.join('./images', path.basename(imageToDelete.link));
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Remove the image from the car's photos array
        car.images = car.images.filter((photo) => String(photo.id) !== imageId);

        await car.save();
        return car.images;
    }
    getCarOutput(car: ICar): CarRecordOutput {
        const cars_output: CarRecordOutput = {
            id: car.id,
            car_id: car.car_id,
            title: car.car_brand + ' ' + car.title,
            images: car.images.map(image => {
                return {
                    ...image,
                    link: PUBLIC_IMAGES_LINK + image.link
                }
            }),
            main_image: { ...car.main_image, link: PUBLIC_IMAGES_LINK + car.main_image?.link },
            price: car.price?.toLocaleString(),
            year: car.year,
            mileage: car.mileage?.toLocaleString() + " KM",
            ask_price: car.ask_price
        }
        return cars_output;
    }
    getCarDetailsOutput(car: ICar): CarDetailsRecordOutput {
        const cars_output: CarDetailsRecordOutput = {
            id: car.id,
            car_id: car.car_id,
            title: car.car_brand + ' ' + car.title,
            images: car.images.map(image => {
                return {
                    ...image,
                    link: PUBLIC_IMAGES_LINK + image.link
                }
            }),
            main_image: { ...car.main_image, link: PUBLIC_IMAGES_LINK + car.main_image.link },
            price: car.price.toLocaleString(),
            year: car.year,
            mileage: car.mileage.toLocaleString() + " KM",
            ask_price: car.ask_price,
            description: car.description,
            exterior_colour: car.exterior_colour,
            interior_colour: car.interior_colour,
            driver_position: car.driver_position,
            engine: car.engine,
            body_type: car.body_type,
            transmission: car.transmission,
            featured: car.featured,
            doors: car.doors,
            power: car.power + " HP",
            torque: car.torque + " N.M",
            specification: car.specification,
            top_speed: car.top_speed + " KM/H",
            zero_to_100: car.zero_to_100,
            more_info: car.more_info,
            car_brand: car.car_brand,
        }
        return cars_output;
    }
}
