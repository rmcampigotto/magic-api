import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CommanderService } from './commander.service';
import { CreateCommanderDto } from './dto/create-commander.dto';
import { UpdateCommanderDto } from './dto/update-commander.dto';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../auth/auth.guard';
import   mtgApi from '../utils/mtgApi';
import   utilities  from '../utils/export'
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/decorators/roles.decorator';
import { Role } from '../auth/roles/enums/roles.enum';

@Controller('commander')
export class CommanderController {
  constructor(private readonly commanderService: CommanderService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('create')
  create(@Body() createCommanderDto: CreateCommanderDto) {
    try {
      this.commanderService.create(createCommanderDto);
      return { message: `Commander salvo com sucesso!`, commander: createCommanderDto };
    } catch (error) {
      return { message: `Erro ao salvar commander: ${error}` };
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('findAllAdmin')
  findAll() {
    try {
      return this.commanderService.findAll();
    } catch (error) {
      return { message: `Erro ao buscar os commanders: ${error}` };
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER,Role.ADMIN)
  @Get('findAll')
  findAllByUser(@Req() req: Request) {
    try {
      const userId = req['user'];
      return this.commanderService.findAllByUser(userId.sub);
    } catch (error) {
      return { message: `Erro ao buscar os commanders: ${error}` };
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get('findById/:commanderName')
  findOne(@Param('commanderName') commanderName: String, @Req() req: Request) {
    try {
      const userId = req['user'];
      return this.commanderService.findOne(commanderName, userId.sub);
    } catch (error) {
      return { message: `Erro ao procurar o commander: ${error}` };
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('update/:commanderName')
  update(@Param('commanderName') commanderName: String, @Body() updateUserDto: UpdateCommanderDto) {
    try {
      this.commanderService.update(commanderName, updateUserDto);
      return { message: `Commander salvo com sucesso!`, user: updateUserDto };
    } catch (error) {
      return { message: `Erro ao alterar o commander com 'commanderName' = ${commanderName}: ${error}` };
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('delete/:commanderName')
  remove(@Param('commanderName') commanderName: String) {
    try {
      this.commanderService.remove(commanderName);
      return { message: `Commander deletado com sucesso!` };
    } catch (error) {
      return { message: `Erro ao deletar o commander com 'commanderName' = ${commanderName}: ${error}` };
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('apiGetAndSave/:commanderName')
  async apiGetAndSave(@Param('commanderName') commanderName: String, @Req() req: Request) {
    try {
      const userId = req['user'];
      const result = await mtgApi.getCommanderByNameAndCards(commanderName, userId.sub);
      const commadnerDto = plainToInstance(CreateCommanderDto, result);

      this.commanderService.create(commadnerDto);

      return {message: `Busca na API realizada com sucesso e salvo no banco!`};
    } catch (error) {
      return { message: `Erro ao buscar na API e salvar no banco: ${error}` };
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get('export')
  async deckExport() {
    try {
      
      const result = await this.commanderService.findAll();

      utilities.exportJson(result);

      return {message: `Deck exportado!`};
    } catch (error) {
      return { message: `Erro ao buscar na API e salvar no banco: ${error}` };
    }
  }

}
