import { Test, TestingModule } from '@nestjs/testing';
import { RolesQueryService } from './roles-query.service';

describe('RolesQueryService', () => {
  let service: RolesQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesQueryService],
    }).compile();

    service = module.get<RolesQueryService>(RolesQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
