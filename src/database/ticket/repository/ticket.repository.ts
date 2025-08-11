import { Injectable } from '@nestjs/common';
import { Ticket } from '../../../ticket'
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TicketsRepository {
    constructor(private prisma: PrismaService) {}

    async fetchAllTickets() {
        return await this.prisma.ticket.findMany()
    }

    async findTicketById(ticketId: number) {
        return this.prisma.ticket.findUnique({
            where: {
                id: ticketId
            }
        });
    }

    async createTicket(ticket: Partial<Ticket>) {
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
    }

    async updateTicket(ticket: Ticket) {
        await this.prisma.ticket.update({
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
            status: `Updated ticket [id: ${ticket.id}]`
            }
        });
    }

}