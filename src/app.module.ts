import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';
import { PrismaModule } from './prisma/prisma.module';
import { QRModule } from './qr/qr.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), 
  MovieModule, 
  PrismaModule,
  QRModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
