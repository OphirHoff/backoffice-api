// import { Injectable, OnModuleInit } from "@nestjs/common";
// import { SQS } from 'aws-sdk';
// import { TicketsService } from './ticket.service';

// export class TicketsConsumer implements OnModuleInit {
//     private sqs = new SQS({ 'region': 'eu-north-1' });
//     private queueUrl = process.env.SQS_TICKETS_URL;

//     constructor(private readonly ticketsService: TicketsService) {}

//     async onModuleInit() {
//         this.pollQueue();
//     }

//     private async pollQueue() {
//         while (true) {
//             const res = await this.sqs.receiveMessage({
//                 QueueUrl: this.queueUrl,
//                 MaxNumberOfMessages: 10,
//                 WaitTimeSeconds: 20,
//             }).promise();

//             if (res.Messages) {
//                 for (const msg of res.Messages) {
//                     const ticket = JSON.parse(msg.Body);
//                     await this.ticketsService.createTicket(ticket);

//                     await this.sqs.deleteMessage({
//                         QueueUrl: this.queueUrl,
//                         ReceiptHandle: msg.ReceiptHandle,
//                     }).promise();
//                 }
//             }
//     }
//     }
// }