import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import express from 'express';

// Cache the app instance
let cachedApp: INestApplication;

async function bootstrap(): Promise<INestApplication> {
  if (!cachedApp) {
    // Create Express instance first
    const expressApp = express();
    
    // Create NestJS app with Express adapter
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp)
    );

    app.enableCors({
      origin: '*',
      credentials: true,
    });

    // Initialize the app (don't call listen() for serverless)
    await app.init();
    cachedApp = app;
  }
  
  return cachedApp;
}

// For local development only
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(async (app) => {
    await app.listen(3000);
    console.log('Application is running on: http://localhost:3000');
  });
}

// Export for Vercel serverless
export default async (req: Request, res: Response) => {
  try {
    const app = await bootstrap();
    const expressApp = app.getHttpAdapter().getInstance();
    return expressApp(req, res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};