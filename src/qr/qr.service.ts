import { Injectable, Logger } from "@nestjs/common";
import { MovieService } from "../movie/movie.service";
import * as QRCode from 'qrcode';

@Injectable()
export class QRService {
  private readonly logger = new Logger(QRService.name);

  constructor(
    private movieService: MovieService
  ) {}

  async generateQRCode(): Promise<{ qrCodeUrl: string }> {
    const movie_id = (await this.movieService.saveMovie()).id;

    const movie_link = `http://localhost:5173/movies/${movie_id}`;

    const qrCodeUrl = await QRCode.toDataURL(movie_link);

    return { qrCodeUrl }
  }
}