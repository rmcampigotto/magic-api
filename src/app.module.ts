import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { CommanderModule } from './commander/commander.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/magic-api'), CommanderModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})

export class AppModule {}

