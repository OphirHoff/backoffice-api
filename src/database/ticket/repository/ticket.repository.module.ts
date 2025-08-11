import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketsRepository } from './ticket.repository';

@Module({
    imports: [PrismaService],
    providers: [TicketsRepository],
    exports: [TicketsRepository]
})
export class TicketsRepositoryModule {}