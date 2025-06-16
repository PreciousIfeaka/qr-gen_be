import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HttpModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      timeout: 10000,
      baseURL: configService.get<string>("API_BASE_URL"),
      headers: {"Authorization": `Bearer ${configService.get<string>("TMDB_JWT")}`}
    }),
    inject: [ConfigService]
  }), ConfigModule, PrismaModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService]
})
export class MovieModule {}
