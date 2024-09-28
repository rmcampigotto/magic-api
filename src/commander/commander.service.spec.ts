import { Test, TestingModule } from '@nestjs/testing';
import { CommanderService } from './commander.service';
import { getModelToken } from '@nestjs/mongoose';
import { Commander } from './schemas/commander.schema';

describe('CommanderService', () => {
  let service: CommanderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommanderService,
        {
          provide: getModelToken(Commander.name),
          useValue: {}, // Mock do model
        },
      ],
    }).compile();

    service = module.get<CommanderService>(CommanderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
