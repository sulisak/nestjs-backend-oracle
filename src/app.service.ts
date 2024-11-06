/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
// eslint-disable-next-line prettier/prettier
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
