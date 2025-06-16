import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { QRService } from "./qr.service";

@Controller("/api/qr")
export class QRController {
  constructor(private readonly qrService: QRService) {}

  @Get()
  async getQRCode(@Res() res: Response) {
    const qrCodeUrl = await this.qrService.generateQRCode();
    
    return res.json(qrCodeUrl);
  }
}