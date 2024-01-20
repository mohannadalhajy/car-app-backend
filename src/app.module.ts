import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from './car/car.module';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/car-crud'), CarModule, SeederModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly seederService: SeederService) { }

  async onApplicationBootstrap() {
    await this.seederService.downloadAndStoreImages();
  }
}
