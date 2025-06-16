import { Module } from "@nestjs/common";
import { MovieModule } from "../movie/movie.module";
import { QRController } from "./qr.controller";
import { QRService } from "./qr.service";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [MovieModule, ConfigModule],
  controllers: [QRController],
  providers: [QRService]
})
export class QRModule {}
