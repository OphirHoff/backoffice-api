import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Consumer } from 'sqs-consumer';
import { SQSClient, Message } from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
import { TicketsService } from 'src/ticket/ticket.service';

@Injectable()
export class ConsumerService implements OnModuleInit, OnModuleDestroy {
    private consumer;
    private sqsClient: SQSClient;

    constructor(
        private readonly configService: ConfigService,
        private readonly ticketsService: TicketsService
    ) {
        this.sqsClient = new SQSClient({});
    }

    onModuleInit() {
        this.consumer = Consumer.create({
            queueUrl: this.configService.get<string>('SQS_TICKETS_URL')!,
            sqs: this.sqsClient,
            handleMessage: async (message: Message) => {
                await this.processMessage(message);
            },
        });

        this.consumer.on('error', console.error);
        this.consumer.start();
    }

    onModuleDestroy() {
        this.consumer.stop();
    }

    private async processMessage(message: Message) {
        try {
            const ticket = JSON.parse(message.Body || '{}');
            console.log('Parsed payload:', ticket);
            
            if ('id' in ticket) {
                await this.ticketsService.updateTicket(ticket);
            } else {
                await this.ticketsService.createTicket(ticket);
            }

            } catch (error) {
            console.error('Failed to parse message body:', error);
        }
    }
}