import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { CommanderModule } from './commander/commander.module';
import {Commander, CommanderSchema} from './commander/schemas/commander.schema'
import { CacheModule } from '@nestjs/cache-manager';
import { CommanderService } from './commander/commander.service';
import { CommanderController } from './commander/commander.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/magic-api'), CommanderModule, AuthModule, UserModule,
    CacheModule.register(),
    MongooseModule.forFeature([{name: Commander.name, schema: CommanderSchema}])
  ],
  controllers: [CommanderController],
  providers: [CommanderService],
  exports: [CommanderService],
})

export class AppModule {}

