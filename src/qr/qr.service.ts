import { Injectable, Logger } from "@nestjs/common";
import { MovieService } from "../movie/movie.service";
import * as QRCode from 'qrcode';

@Injectable()
export class QRService {
  private readonly logger = new Logger(QRService.name);

  constructor(
    private movieService: MovieService,
    private readonly configService: ConfigService
  ) {}

  async generateQRCode(): Promise<{ qrCodeUrl: string }> {
    const movie_id = (await this.movieService.saveMovie()).id;

    const movie_link = `${configService.get<string>("FE_URL")}/movies/${movie_id}`;

    const qrCodeUrl = await QRCode.toDataURL(movie_link);

    return { qrCodeUrl }
  }
}
