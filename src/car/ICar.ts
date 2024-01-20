/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongoose';
import IImage from 'src/image/IImage';

export default interface ICar {
    id: ObjectId;
    title: String;
    description: String;
    year: Number;
    mileage: Number;
    exterior_colour: String;
    interior_colour: String;
    driver_position: String;
    engine: String;
    body_type: String;
    transmission: String;
    price: Number;
    featured: Boolean;
    car_id: String;
    doors: Number;
    power: Number;
    torque: Number;
    specification: String;
    top_speed: Number;
    zero_to_100: Number;
    more_info: String;
    ask_price: Boolean;
    images: IImage[];
    main_image: IImage;
    car_brand: String;
    created_at: Date;
    updated_at: Date;
}