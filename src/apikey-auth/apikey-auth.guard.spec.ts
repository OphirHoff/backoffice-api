import { ApikeyAuthGuard } from './apikey-auth.guard';

describe('ApikeyAuthGuard', () => {
  it('should be defined', () => {
    expect(new ApikeyAuthGuard()).toBeDefined();
  });
});
