import { PartialType } from '@nestjs/mapped-types';
import { CreateCommanderDto } from './create-commander.dto';

export class UpdateCommanderDto extends PartialType(CreateCommanderDto) {}
