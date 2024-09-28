import { Injectable, Inject } from '@nestjs/common';
import { CreateCommanderDto } from './dto/create-commander.dto';
import { UpdateCommanderDto } from './dto/update-commander.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Commander } from './schemas/commander.schema';
import { Model } from 'mongoose';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CommanderService {
  
  constructor(
    @InjectModel(Commander.name) private commanderModel: Model<Commander>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache // Injetando corretamente o CACHE_MANAGER
  ) {}

    async findAll(): Promise<Commander[]> {
        return this.commanderModel.find().exec()
    }

    async findOne(commanderName: String, userId: Number): Promise<Commander> {
        return this.commanderModel.findOne({commanderName: commanderName, userID: userId}).exec()
    }

    async findAllByUser(userId: Number): Promise<Commander[]> {
      return this.commanderModel.find({ userId: userId }).exec();
    }

    async create(createCommanderDto: CreateCommanderDto){
        return this.commanderModel.create({commanderName: createCommanderDto.commanderName, color: createCommanderDto.color, cards: createCommanderDto.cards, userId: createCommanderDto.userId})
    }

    async update(commanderName: String, updateCommanderDto: UpdateCommanderDto): Promise<Commander> {
        return this.commanderModel.findOneAndUpdate({commanderName: commanderName}, {color: updateCommanderDto.color, cards: updateCommanderDto.cards}).exec()
      }
    
    async remove(commanderName: String): Promise<Commander> {
        return this.commanderModel.findOneAndDelete({commanderName: commanderName}).exec()
    }

    async getData(param: string): Promise<string> {
      const cachedValue = await this.cacheManager.get<string>(param);
  
      if (cachedValue) {
        return cachedValue; 
      }
  
      console.log('Executando operação pesada...'); 
      const result = `Resultado para ${param}`;
  
      // Ajustando a chamada para set
      await this.cacheManager.set(param, result, 10); // TTL como número
      return result;
    }
    
}
