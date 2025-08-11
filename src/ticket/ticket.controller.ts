import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
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

  @Get('getById/:id')
  getTicket(@Param('id') id: number) {
    return this.ticketsService.getTicketById(+id);
  }

  @Post()
  addTicket(@Body() ticket: Partial<Ticket>) {

    if (!ticket.description || !ticket.content) return undefined;

    this.ticketsService.requestTicketCreation(ticket);
  }

  @Post('updateTicket')
  updateTicket(@Body() ticket: Ticket) {
    if (!ticket.id || !ticket.description || !ticket.content) return undefined;

    this.ticketsService.updateTicket(ticket);
  }
}
