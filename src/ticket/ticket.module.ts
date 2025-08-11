import { Module } from '@nestjs/common';
import { TicketsController } from './ticket.controller';
import { TicketsService } from './ticket.service';
import { TicketsConsumer } from './ticket.consumer';
import { TicketsRepository } from 'src/database/ticket/repository/ticket.repository';

@Module({
  imports: [],
  controllers: [TicketsController],
  providers: [TicketsService, TicketsConsumer, TicketsRepository],
  exports: [TicketsService]
})
export class TicketModule {}
