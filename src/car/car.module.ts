import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/config/server.config';
import CarSchema from './car.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: ModuleNames.Car,
          schema: CarSchema,
        },
      ]
    ),
  ],
  providers: [CarService],
  controllers: [CarController]
})
export class CarModule { }
