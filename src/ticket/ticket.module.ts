import { Module } from '@nestjs/common';
import { TicketsController } from './ticket.controller';
import { TicketsService } from './ticket.service';
import { TicketsConsumer } from './ticket.consumer';

@Module({
  imports: [],
  controllers: [TicketsController],
  providers: [TicketsService, TicketsConsumer],
  exports: [TicketsService]
})
export class TicketModule {}
