import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';
import { Movie, TmdbApiResponseType, TmdbAxiosResponse } from './types/movies';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Movie as PrismaMovie } from '@prisma/client';

@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);

  constructor(
    private httpService: HttpService, 
    private prismaService: PrismaService,
    private configService: ConfigService
  ) {}

  async saveMovie(): Promise<PrismaMovie> {
    const presentMovies = await this.prismaService.movie.findMany({
      where: {
        deleted_at: {
          lt: new Date()
        }
      }
    });
    
    if (presentMovies.length > 0) {
      for (const movie of presentMovies) {
        await this.deleteMovie(movie.id);
      }
    }
    const page = Math.floor(Math.random() * 500) + 1;

    const moviesResponse: TmdbAxiosResponse = this.httpService
      .get<TmdbApiResponseType>(
        `/discover/movie?with_original_language=en&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
      );

    const movies: Movie[] = await lastValueFrom(
      moviesResponse.pipe(
      map(response => response.data.results.map((result) => ({
          title: result.original_title ?? result.title,
          image_url: `https://image.tmdb.org/t/p/w154${result.poster_path}`
        }))
      )
    ));

    const savedMovies: PrismaMovie = await this.prismaService.movie.create({
    data: {
      movies: movies.slice(0, 10),
      deleted_at: new Date(Date.now() + (2 * 60 * 1000))
    }
  });

    this.logger.log(`Successfully generated movie list with id: ${savedMovies.id}`);
    
    return savedMovies;
  }

  async findMovieById(id: string): Promise<PrismaMovie> {
    const movie = await this.prismaService.movie.findFirst({ where: { id }});

    if (!movie) throw new NotFoundException("Movie list not found");

    return movie;
  }

  async deleteMovie(id: string): Promise<string> {
    const movie = await this.findMovieById(id);
    await this.prismaService.movie.delete({ where: { id }});

    this.logger.log(`Successfully deleted movie list of id: ${id}`);
    return movie.id;
  }
}
