import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const server = express();

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
  
  if (process.env.VERCEL_ENV === 'development') {
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }

};

bootstrap();

export default server;
