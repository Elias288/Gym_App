import { IsOptional, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Rutina } from 'src/schemas/rutinas.schema';

// Usuario utilizado para crear y almacenar

export class UsuarioDto {
  _id?: string;

  @IsString()
  @IsNotEmpty()
  local_id: string;

  @IsString({ message: 'Nombre de usuario invalido' })
  @IsNotEmpty({ message: 'Nombre de usuario invalido' })
  @MinLength(4, { message: 'El nombre de usuario debe ser más largo' })
  user_name: string;

  @IsString({ message: 'Contraseña invalida' })
  @IsNotEmpty({ message: 'Contraseña invalida' })
  @MinLength(6, { message: 'La contraseña debe ser más larga' })
  password: string;

  rutinas?: Rutina[];

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsOptional()
  @IsString()
  altura?: string;

  @IsOptional()
  @IsString()
  peso?: string;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsString()
  selectedRoutineId?: string;
}
