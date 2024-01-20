import { Injectable } from '@nestjs/common';
import * as axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import imagesLinks from './images';
import { CarService } from 'src/car/car.service';
import cars_records from './cars_records';
const baseLink = 'https://strapiadmin.f1rstmotors.com/uploads/'
@Injectable()
export class SeederService {
    constructor(private readonly carService: CarService) { }
    async downloadAndStoreImages(): Promise<void> {
        const cars = await this.carService.findAllCars();
        if (cars.length) return;
        const cars_input = cars_records;
        await this.carService.createCars(cars_input);
        const downloadPromises = imagesLinks.map(async (link) => {
            try {
                const response = await axios.default.get(baseLink + link, { responseType: 'arraybuffer' });
                const filePath = path.join('images', link);
                // Ensure the 'images' directory exists
                if (!fs.existsSync(path.join('images')))
                    fs.mkdirSync(path.join('images'));
                // Write the downloaded image to local storage
                fs.writeFileSync(filePath, Buffer.from(response.data));
                await Promise.all(downloadPromises);
            } catch (error) {
                console.error(`Error downloading image from ${link}: ${error.message}`);
            }
        });
    }
}
