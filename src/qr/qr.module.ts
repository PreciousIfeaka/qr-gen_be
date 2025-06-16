import { Module } from "@nestjs/common";
import { MovieModule } from "../movie/movie.module";
import { QRController } from "./qr.controller";
import { QRService } from "./qr.service";

@Module({
  imports: [MovieModule],
  controllers: [QRController],
  providers: [QRService]
})
export class QRModule {}