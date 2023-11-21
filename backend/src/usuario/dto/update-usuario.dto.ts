import { PartialType } from '@nestjs/mapped-types';
import { UsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(UsuarioDto) {}
