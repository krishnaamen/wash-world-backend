import { Test, TestingModule } from '@nestjs/testing';
import { WashplanController } from './washplan.controller';
import { WashplanService } from './washplan.service';

describe('WashplanController', () => {
  let controller: WashplanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashplanController],
      providers: [WashplanService],
    }).compile();

    controller = module.get<WashplanController>(WashplanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
