import { Module } from '@nestjs/common';
import { TicketsController } from './ticket.controller';
import { TicketsService } from './ticket.service';
import { TicketsRepository } from 'src/database/ticket/repository/ticket.repository';

@Module({
  imports: [],
  controllers: [TicketsController],
  providers: [TicketsService, TicketsRepository],
  exports: [TicketsService]
})
export class TicketModule {}
