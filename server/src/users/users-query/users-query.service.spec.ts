import { Test, TestingModule } from '@nestjs/testing';
import { UsersQueryService } from './users-query.service';

describe('UsersQueryService', () => {
  let service: UsersQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersQueryService],
    }).compile();

    service = module.get<UsersQueryService>(UsersQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
