import { PartialType } from '@nestjs/mapped-types';
import { RutinaDto } from './create-rutina.dto';

export class UpdateRutinaDto extends PartialType(RutinaDto) {}
