import { Module } from '@nestjs/common';
import { CommanderService } from './commander.service';
import { CommanderController } from './commander.controller';
import { Commander, CommanderSchema } from './schemas/commander.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Commander.name, schema: CommanderSchema }])],
  providers: [CommanderService],
  controllers: [CommanderController],
  exports: [CommanderService, CommanderModule]
})
export class CommanderModule {}
