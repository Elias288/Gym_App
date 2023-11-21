import { IsOptional, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Rutina } from 'src/schemas/rutinas.schema';

// Usuario utilizado para crear y almacenar

export class UsuarioDto {
  _id?: string;

  @IsString()
  @IsNotEmpty()
  local_id: string;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  rutinas?: Rutina[];

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  altura?: number;

  @IsOptional()
  @IsNumber()
  peso?: number;

  @IsOptional()
  @IsString()
  genero?: string;
}
