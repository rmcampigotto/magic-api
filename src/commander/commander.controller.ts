import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommanderService } from './commander.service';
import { CreateCommanderDto } from './dto/create-commander.dto';
import { UpdateCommanderDto } from './dto/update-commander.dto';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from 'src/auth/auth.guard';
import mtgApi from 'src/utilities/mtgApi';
import utilities from 'src/utilities/export'

@Controller('commander')
export class CommanderController {
  constructor(private readonly commanderService: CommanderService) { }

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() createUserDto: CreateCommanderDto) {
    try {
      this.commanderService.create(createUserDto);
      return { message: `Commander salvo com sucesso!`, user: createUserDto };
    } catch (error) {
      return { message: `Erro ao salvar commander: ${error}` };
    }
  }

  @UseGuards(AuthGuard)
  @Get('findAll')
  findAll() {
    try {
      return this.commanderService.findAll();
    } catch (error) {
      return { message: `Erro ao buscar os commanders: ${error}` };
    }

  }

  @UseGuards(AuthGuard)
  @Get('findById/:commanderName')
  findOne(@Param('commanderName') commanderName: String) {
    try {
      return this.commanderService.findOne(commanderName);
    } catch (error) {
      return { message: `Erro ao procurar o commander: ${error}` };
    }
  }

  @UseGuards(AuthGuard)
  @Patch('update/:commanderName')
  update(@Param('commanderName') commanderName: String, @Body() updateUserDto: UpdateCommanderDto) {
    try {
      this.commanderService.update(commanderName, updateUserDto);
      return { message: `Commander salvo com sucesso!`, user: updateUserDto };
    } catch (error) {
      return { message: `Erro ao alterar o commander com 'commanderName' = ${commanderName}: ${error}` };
    }
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:commanderName')
  remove(@Param('commanderName') commanderName: String) {
    try {
      this.commanderService.remove(commanderName);
      return { message: `Commander deletado com sucesso!` };
    } catch (error) {
      return { message: `Erro ao deletar o commander com 'commanderName' = ${commanderName}: ${error}` };
    }
  }

  @UseGuards(AuthGuard)
  @Post('apiGetAndSave/:commanderName')
  async apiGetAndSave(@Param('commanderName') commanderName: String) {
    try {
      
      const result = await mtgApi.getCommanderByNameAndCards(commanderName);
      const commadnerDto = plainToInstance(CreateCommanderDto, result);

      this.commanderService.create(commadnerDto);

      return {message: `Busca na API realizada com sucesso e salvo no banco!`};
    } catch (error) {
      return { message: `Erro ao buscar na API e salvar no banco: ${error}` };
    }
  }

  @UseGuards(AuthGuard)
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
