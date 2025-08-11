import { Injectable } from '@nestjs/common';
import { Ticket } from '../ticket'
import { PrismaService } from '../prisma/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TicketsService {
  private queueUrl = process.env.SQS_TICKETS_URL;
  private sqs: SQS;

  constructor(private prisma: PrismaService, private readonly configService: ConfigService) {
      this.sqs = new SQS({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  }

  async getAllTickets() {
    return this.prisma.ticket.findMany();
  }

  getTicketById(ticketId: number) {
    return this.prisma.ticket.findFirst({
      where: {
        id: ticketId
      }
    });
  }

  async requestTicketCreation(ticket: Partial<Ticket>) {

    // add to SQS queue
    await this.sqs.sendMessage({
      QueueUrl: this.queueUrl!,
      MessageBody: JSON.stringify(ticket)
    }).promise()
  }

  async createTicket(ticket: Partial<Ticket>) {
    try {
      const newTicket = await this.prisma.ticket.create({
        data: {
          description: ticket.description ?? "",
          content: ticket.content ?? "",
        },
        include: { log: true }
      });

      await this.prisma.log.create({
        data: {
          id: newTicket.id,
          status: `New ticket created [id: ${newTicket.id}]`,
        }
      });
    } catch (err) {
      console.error(`Ticket creation fail: ${err}`);
      throw new InternalServerErrorException('Failed to create ticket.');
    }
  }

  async requestTicketUpdate(ticket: Ticket) {
    await this.sqs.sendMessage({
      QueueUrl: this.queueUrl!,
      MessageBody: JSON.stringify(ticket)
    }).promise()
  }

  async updateTicket(ticket: Ticket) {
    try {
      const ticketUpdate = await this.prisma.ticket.update({
        where: {
          id: ticket.id
        },
        data: {
          description: ticket.description,
          content: ticket.content
        },
        include: { log: true }
      });

      await this.prisma.log.update({
        where: {
          id: ticket.id
        },
        data: {
          status: `Updated ticket [id: ${ticketUpdate.id}]`
        }
    });
    } catch (err) {
      console.error(`Ticket update fail: ${err}`);
      throw new InternalServerErrorException('Failed to update ticket.');
    }
  }
}
