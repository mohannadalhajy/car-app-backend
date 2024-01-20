import { HttpException } from '@nestjs/common';
import * as dotenv from 'dotenv';
export enum ModuleNames {
  Car = 'Car',

};
dotenv.config({ path: './.env' });
export const PUBLIC_IMAGES_LINK = process.env.PUBLIC_IMAGES_LINK;

class MyError {
  server_code: number;

  constructor(server_code: number) {
    this.server_code = server_code;
  }
}
export class ServerError extends HttpException {
  statusCode: number;
  message: string;
  error: MyError;
  validation_errors?: any;
  constructor(
    status_code: number,
    message: any,
    server_code = 0,
    validation_errors: any = {},
  ) {
    super(
      {
        statusCode: status_code,
        message,
        error: new MyError(server_code),
        validation_errors,
      },
      status_code,
    );
  }
}
export class ServerResponse {
  statusCode: number;
  message: string;
  data: any;
  constructor(status_code: number, message: string, data: any) {
    this.statusCode = status_code;
    this.message = message;
    this.data = data;
  }
}