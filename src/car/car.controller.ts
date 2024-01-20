import { Controller, Get, Post, Put, Param, Body, NotFoundException, Delete, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { CarService } from './car.service';
import ICar from './ICar';
import { CarDetailsRecordOutput, CarRecordInput, CarRecordOutput } from './car_dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { ServerResponse } from 'src/config/server.config';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) { }

  @Post()
  async createCar(@Body() createCarDto: CarRecordInput) {
    await this.carService.createCar(createCarDto);
  }

  @Get()
  async findAllCars(): Promise<CarRecordOutput[]> {
    return this.carService.findAllCars();
  }

  @Get('/details/:id')
  async findOneCar(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.carService.findOneCar(id)
      res.status(HttpStatus.OK)
        .json(new ServerResponse(HttpStatus.OK, 'success', result));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
  }

  @Get(':id')
  async findOneCarRecord(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.carService.findOneCarRecord(id)
      res.status(HttpStatus.OK)
        .json(new ServerResponse(HttpStatus.OK, 'success', result));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
  }

  @Put(':id')
  async updateCar(@Param('id') id: string, @Body() updateCarDto: ICar): Promise<ICar> {
    try {
      return await this.carService.update(id, updateCarDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
  }
  @Delete(':id')
  async removeCar(@Param('id') id: string): Promise<void> {
    try {
      // const cars = await this.findAllCars()
      // cars.map(async element => {
      //   await this.carService.remove(String(element.id));  
      // });
      await this.carService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
  }
  @Post('/:carId/images')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './images', // Store images in the 'images' folder
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    })
  }))
  async uploadCarImage(@UploadedFile() image, @Param('carId') carId: string, @Res() res: Response): Promise<void> {
    console.log(carId)
    const images = await this.carService.addCarImage(carId, image.filename);
    res.status(HttpStatus.OK)
      .json(new ServerResponse(HttpStatus.OK, 'success', images));
  }
  @Post('/images')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './images', // Store images in the 'images' folder
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    })
  }))
  async uploadImage(@UploadedFile() image, @Res() res: Response) {
    res.status(HttpStatus.OK)
      .json(new ServerResponse(HttpStatus.OK, 'success', { link: image.filename }));
  }
  @Post('/:carId/main_image')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './images', // Store images in the 'images' folder
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    })
  }))
  async uploadCarMainImage(@UploadedFile() image, @Param('carId') carId: string, @Res() res: Response): Promise<void> {
    console.log(carId)
    await this.carService.addCarMainImage(carId, image.filename);
    res.status(HttpStatus.OK)
      .json(new ServerResponse(HttpStatus.OK, 'success', { link: image.filename }));
  }
  @Delete(':carId/images/:imageId')
  async deleteCarImage(@Param('carId') carId: string, @Param('imageId') imageId: string, @Res() res: Response): Promise<void> {
    const images = await this.carService.deleteCarImage(carId, imageId);
    res.status(HttpStatus.OK)
      .json(new ServerResponse(HttpStatus.OK, 'success', images));
  }
}
