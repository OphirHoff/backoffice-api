import { Injectable, OnModuleInit } from "@nestjs/common";
import { SQS } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { TicketsService } from './ticket.service';

@Injectable()
export class TicketsConsumer implements OnModuleInit {
    private queueUrl;
    private sqs: SQS;

    constructor(private readonly ticketsService: TicketsService, private readonly configService: ConfigService) {
        this.sqs = new SQS({
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
            accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
            secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
            },
        });
    }

    async onModuleInit() {
        this.pollQueue();
    }

    private async pollQueue() {
        if (!process.env.SQS_TICKETS_URL) {
            throw new Error('SQS_TICKETS_URL is not set in environment variables')
        }
        this.queueUrl = process.env.SQS_TICKETS_URL;

        while (true) {
            const res = await this.sqs.receiveMessage({
                QueueUrl: this.queueUrl,
                MaxNumberOfMessages: 10,
                WaitTimeSeconds: 20,
            }).promise();

            if (res.Messages) {
                for (const msg of res.Messages) {
                    if (!msg.Body || !msg.ReceiptHandle) continue;
                    
                    const ticket = JSON.parse(msg.Body);
                    await this.ticketsService.createTicket(ticket);

                    await this.sqs.deleteMessage({
                        QueueUrl: this.queueUrl!,
                        ReceiptHandle: msg.ReceiptHandle,
                    }).promise();
                }
            }
        }
    }
}