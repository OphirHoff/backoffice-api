import { Ticket } from '../ticket'

export class UserAddedTicket {
    constructor(public readonly ticket: Partial<Ticket>) {}
}