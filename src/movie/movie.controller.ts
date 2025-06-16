import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('/api/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(":id")
  async findOne(
    @Param("id") id: string
  ) {
    return await this.movieService.findMovieById(id);
  }
}
