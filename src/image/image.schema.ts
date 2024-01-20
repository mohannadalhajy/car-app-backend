/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
    {
        link: { type: String },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

ImageSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: any) {
        delete ret._id;
    },
});

export default ImageSchema;
