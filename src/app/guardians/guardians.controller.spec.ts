import { Test, TestingModule } from '@nestjs/testing';
import { GuardiansController } from './guardians.controller';

describe('GuardiansController', () => {
  let controller: GuardiansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuardiansController],
    }).compile();

    controller = module.get<GuardiansController>(GuardiansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
