import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TicketsController } from './app.controller';
import { TicketsService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class AppModule {}
