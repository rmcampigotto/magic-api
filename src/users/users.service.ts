import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec()
      }

    async findOne(username: String): Promise<User> {
        return this.userModel.findOne({username: username}).exec()
    }

    async create(createUserDto: CreateUserDto){
        const hashPass = await bcrypt.hash(createUserDto.password, saltOrRounds);
        return this.userModel.create({id: createUserDto.id, username: createUserDto.username, password: hashPass})
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const hashPass = await bcrypt.hash(updateUserDto.password, saltOrRounds);
        return this.userModel.findOneAndUpdate({id: id}, {id: id, username: updateUserDto.username, password: hashPass}).exec()
      }
    
    async remove(id: number): Promise<User> {
        return this.userModel.findOneAndDelete({id: id}).exec()
    }
}