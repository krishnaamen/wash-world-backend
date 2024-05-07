import { Test, TestingModule } from '@nestjs/testing';
import { WashplanService } from './washplan.service';

describe('WashplanService', () => {
  let service: WashplanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WashplanService],
    }).compile();

    service = module.get<WashplanService>(WashplanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
