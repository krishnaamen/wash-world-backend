import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));//validation pipe is used to validate the data
  //If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators.
  app.setGlobalPrefix('api/v1');//we have an global APi link with different endpoints
  await app.listen(3000);

}
bootstrap();
