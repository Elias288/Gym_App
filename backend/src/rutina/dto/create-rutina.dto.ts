import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRutinaDto {
  @IsNotEmpty()
  @IsString()
  local_id: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  ejercicios: string;
}
