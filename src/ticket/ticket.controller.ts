import { Controller, Get, Param, Post, Body, UseGuards, Put } from '@nestjs/common';
import { TicketsService } from './ticket.service';
import type { Ticket } from '../ticket';
import { ApikeyAuthGuard } from '../apikey-auth/apikey-auth.guard';

@UseGuards(ApikeyAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  getAllTickets() {
    return this.ticketsService.getAllTickets();
  }

  @Get(':id')
  getTicket(@Param('id') id: number) {
    return this.ticketsService.getTicketById(+id);
  }

  @Post()
  addTicket(@Body() ticket: Partial<Ticket>) {

    if (!ticket.description || !ticket.content) return undefined;

    this.ticketsService.requestTicketCreation(ticket);
  }

  @Put(':id')
  updateTicket(@Param('id') id: number, @Body() ticket: Ticket) {
    if (!ticket.description || !ticket.content) return undefined;

    this.ticketsService.requestTicketUpdate(+id, ticket);
  }
}
