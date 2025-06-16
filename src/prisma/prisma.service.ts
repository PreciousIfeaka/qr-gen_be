import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super()
  }

  async onModuleInit() {
    this.$connect;
    this.logger.log('Successfully connected db');
  }

  async onModuleDestroy() {
    this.$disconnect;
    this.logger.log('Successfully disconnected db');
  }
}