import { Injectable } from '@nestjs/common';
import { Ticket } from '../ticket'
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserAddedTicket } from 'src/events/events';
import { SQS } from 'aws-sdk';

@Injectable()
export class TicketsService {
  private sqs = new SQS({ region: 'eu-north-1' });
  private queueUrl = process.env.SQS_TICKETS_URL;

  constructor(private prisma: PrismaService, private eventEmitter: EventEmitter2) {}

  async getAllTickets() {
    return this.prisma.tickets.findMany();
  }

  getTicketById(ticketId: number) {
    return this.prisma.tickets.findFirst({
      where: {
        id: ticketId
      }
    });
  }

  // async requestTicketCreation(ticket: Partial<Ticket>) {
  //   // Add to queue here
  //   await this.sqs.sendMessage({
  //     QueueUrl: this.queueUrl,
  //     MessageBody: JSON.stringify(ticket)
  //   }).promise()
  //   //

  //   this.eventEmitter.emit(
  //     'ticket.creation.requested',;
  //     new UserAddedTicket(ticket)
  //   );
  // }

  async createTicket(ticket: Partial<Ticket>) {
    return await this.prisma.tickets.create({
      data: {
        description: ticket.description ?? "",
        content: ticket.content ?? ""
      }
    })
  }

  async updateTicket(ticket: Ticket) {
    return await this.prisma.tickets.update({
      where: {
        id: ticket.id
      },
      data: {
        description: ticket.description,
        content: ticket.content
      }
    });
  }
}
