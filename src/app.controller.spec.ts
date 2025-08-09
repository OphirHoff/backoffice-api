import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './app.controller';
import { TicketsService } from './app.service';

describe('AppController', () => {
  let appController: TicketsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [TicketsService],
    }).compile();

    appController = app.get<TicketsController>(TicketsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
