import { Test, TestingModule } from '@nestjs/testing';
import { CommanderService } from '../src/commander/commander.service';
import { getModelToken } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Commander } from '../src/commander/schemas/commander.schema';
import { Model } from 'mongoose';

const mockCommanderModel = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
};

const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('CommanderService', () => {
  let service: CommanderService;
  let commanderModel: Model<Commander>;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommanderService,
        {
          provide: getModelToken(Commander.name),
          useValue: mockCommanderModel,
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<CommanderService>(CommanderService);
    commanderModel = module.get<Model<Commander>>(getModelToken(Commander.name));
    cacheManager = module.get<Cache>('CACHE_MANAGER');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should cache and return data when calling getData', async () => {
    const param = 'test';
    const cachedValue = 'cachedResult';
    mockCacheManager.get.mockResolvedValueOnce(cachedValue);

    const result = await service.getData(param);

    expect(result).toBe(cachedValue);
    expect(cacheManager.get).toHaveBeenCalledWith(param);
  });

  it('should cache the result if not found in cache', async () => {
    const param = 'test';
    mockCacheManager.get.mockResolvedValueOnce(null);
    mockCacheManager.set.mockResolvedValueOnce(null);

    const result = await service.getData(param);

    expect(result).toBe(`Resultado para ${param}`);
    expect(cacheManager.set).toHaveBeenCalledWith(param, `Resultado para ${param}`, { ttl: 10 });
  });
});
