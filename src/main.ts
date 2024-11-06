/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // Specify the IP address and port you want to listen on

  const address = '192.168.100.95'; // Specify the IP address
  const port = 3000; // Specify the port

  console.log(`Server is running on http://${address}:${port}`);
}
bootstrap();
// checking