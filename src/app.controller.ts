import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { TicketsService } from './app.service';
import { Ticket } from './database';
import { ApikeyAuthGuard } from './apikey-auth/apikey-auth.guard';

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

    return this.ticketsService.create(ticket);
  }
}
