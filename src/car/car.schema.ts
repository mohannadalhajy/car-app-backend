/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import ImageSchema from 'src/image/image.schema';

const CarSchema = new mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        year: { type: Number },
        mileage: { type: Number },
        exterior_colour: { type: String },
        interior_colour: { type: String },
        driver_position: { type: String },
        engine: { type: String },
        body_type: { type: String },
        transmission: { type: String },
        price: { type: Number },
        featured: {
            type: Boolean
        },
        car_id: { type: String },
        doors: { type: Number },
        power: { type: Number },
        torque: { type: Number },
        specification: { type: String },
        top_speed: { type: Number },
        zero_to_100: { type: Number },
        more_info: { type: String },
        ask_price: { type: Boolean },
        images: [
            {
                type: ImageSchema,
                default: [],
            },
        ],
        main_image:
        {
            type: ImageSchema,
        },
        car_brand: { type: String }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

CarSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: any) {
        delete ret._id;
    },
});

export default CarSchema;
