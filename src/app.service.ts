import { Injectable } from '@nestjs/common';
import { Ticket, tickets } from './database'
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

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

  create(ticket: Partial<Ticket>) {
   
    return this.prisma.tickets.create({
      data: {
        description: ticket.description ?? "",
        content: ticket.content ?? ""
      }
    })
  }
}
