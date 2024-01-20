/* eslint-disable prettier/prettier */

import { ObjectId } from "mongoose";

export default interface IImage {
    id?: ObjectId;
    link: string,
}
