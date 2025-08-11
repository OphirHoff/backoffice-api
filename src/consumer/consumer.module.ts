import { Module } from '@nestjs/common';
import { TicketModule } from '../ticket/ticket.module';
import { ConsumerService } from './consumer.service';

@Module({
    imports: [TicketModule],
    providers: [ConsumerService],
})
export class ConsumerModule {}