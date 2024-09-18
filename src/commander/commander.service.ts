import { Injectable } from '@nestjs/common';
import { CreateCommanderDto } from './dto/create-commander.dto';
import { UpdateCommanderDto } from './dto/update-commander.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Commander } from './schemas/commander.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommanderService {
  
  constructor(@InjectModel(Commander.name) private commanderModel: Model<Commander>) {}

    async findAll(): Promise<Commander[]> {
        return this.commanderModel.find().exec()
      }

    async findOne(commanderName: String, userID: Number): Promise<Commander> {
        return this.commanderModel.findOne({commanderName: commanderName, userID: userID}).exec()
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

}
