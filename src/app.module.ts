import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommanderModule } from './commander/commander.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/magic-api'), CommanderModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})

export class AppModule {}

