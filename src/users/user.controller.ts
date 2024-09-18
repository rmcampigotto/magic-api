import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/roles/enums/roles.enum';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) { };

  //@UseGuards(AuthGuard, RolesGuard)
  //@Roles(Role.ADMIN)
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    try {
      this.usersService.create(createUserDto);
      return { message: `Usuário salvo com sucesso!`, user: createUserDto };
    } catch (error) {
      return { message: `Erro ao salvar usuário: ${error}` };
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get('findAll')
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      return { message: `Erro ao buscar os usuários: ${error}` };
    }

  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get('findById/:id')
  findOne(@Param('id') username: String) {
    try {
      return this.usersService.findOne(username);
    } catch (error) {
      return { message: `Erro ao procurar o usuário: ${error}` };
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      this.usersService.update(id, updateUserDto);
      return { message: `Usuário salvo com sucesso!`, user: updateUserDto };
    } catch (error) {
      return { message: `Erro ao alterar o usuário com ID = ${id}: ${error}` };
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    try {
      this.usersService.remove(id);
      return { message: `Usuário deletado com sucesso!` };
    } catch (error) {
      return { message: `Erro ao deletar o usuário com ID = ${id}: ${error}` };
    }
  }
}