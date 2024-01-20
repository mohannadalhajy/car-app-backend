import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CarService } from 'src/car/car.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleNames } from 'src/config/server.config';
import { SeederController } from './seeder.controller';
import CarSchema from 'src/car/car.schema';

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
  providers: [SeederService, CarService],
  exports: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
