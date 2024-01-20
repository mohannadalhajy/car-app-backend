import { ObjectId } from "mongoose";
import IImage from "src/image/IImage";
import { imageInput } from "src/image/image_dto";

export class CarRecordInput {
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
    images: imageInput[];
    main_image: imageInput;
    car_brand: String;
}
export class CarRecordOutput {
    id: ObjectId;
    title: String;
    year: Number;
    mileage: String;
    price: String;
    car_id: String;
    ask_price: Boolean;
    images: IImage[];
    main_image: IImage;
}
export class CarDetailsRecordOutput {
    id: ObjectId;
    title: String;
    year: Number;
    mileage: String;
    price: String;
    car_id: String;
    ask_price: Boolean;
    images: IImage[];
    main_image: IImage;
    description: String;
    exterior_colour: String;
    interior_colour: String;
    driver_position: String;
    engine: String;
    body_type: String;
    transmission: String;
    featured: Boolean;
    doors: Number;
    power: String;
    torque: String;
    specification: String;
    top_speed: String;
    zero_to_100: Number;
    more_info: String;
    car_brand: String;
}