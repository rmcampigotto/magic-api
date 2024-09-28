import { Module } from '@nestjs/common';
import { CommanderService } from './commander.service';
import { CommanderController } from './commander.controller';
import { Commander, CommanderSchema } from './schemas/commander.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {CacheModule} from '@nestjs/cache-manager';

@Module({
  imports: [MongooseModule.forFeature([{ name: Commander.name, schema: CommanderSchema }]),
  CacheModule.register()],
  providers: [CommanderService],
  controllers: [CommanderController],
})
export class CommanderModule {}
