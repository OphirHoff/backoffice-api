import { Injectable } from '@nestjs/common';
import { Ticket } from '../ticket'
import { PrismaService } from '../prisma/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { TicketsRepository } from 'src/database/ticket/repository/ticket.repository';

@Injectable()
export class TicketsService {
  private queueUrl = process.env.SQS_TICKETS_URL;
  private sqs: SQS;

  constructor(private prisma: PrismaService, private readonly configService: ConfigService, private readonly ticketsRepository: TicketsRepository) {
      this.sqs = new SQS({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  }

  async getAllTickets() {
    return this.ticketsRepository.fetchAllTickets();
  }

  getTicketById(ticketId: number) {
    return this.ticketsRepository.findTicketById(ticketId);
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
      return this.ticketsRepository.createTicket(ticket);
    } catch (err) {
      console.error(`Ticket creation fail: ${err}`);
      throw new InternalServerErrorException('Failed to create ticket.');
    }
  }

  async requestTicketUpdate(id: number, ticket: Partial<Ticket>) {
    ticket.id = id;

    console.log(ticket);

    await this.sqs.sendMessage({
      QueueUrl: this.queueUrl!,
      MessageBody: JSON.stringify(ticket)
    }).promise()
  }

  async updateTicket(ticket: Ticket) {
    try {
      this.ticketsRepository.updateTicket(ticket);
    } catch (err) {
      console.error(`Ticket update fail: ${err}`);
      throw new InternalServerErrorException('Failed to update ticket.');
    }
  }
}
