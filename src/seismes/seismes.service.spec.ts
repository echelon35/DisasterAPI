import { Test, TestingModule } from '@nestjs/testing';
import { SeismesService } from './seismes.service';

describe('SeismesService', () => {
  let service: SeismesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeismesService],
    }).compile();

    service = module.get<SeismesService>(SeismesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
