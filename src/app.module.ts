import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TicketModule } from './ticket/ticket.module';
import { TicketsRepository } from './database/ticket/repository/ticket.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TicketModule,
    // TicketsRepository
  ]
})
export class AppModule {}
