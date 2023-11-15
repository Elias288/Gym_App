import { IsOptional, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  local_id: string;

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
