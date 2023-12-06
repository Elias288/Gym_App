import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RutinaDto {
  _id?: string;

  @IsNotEmpty()
  @IsString()
  local_id: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => Dia)
  contenido: Dia[];

  usuario_id: string;
}

class Dia {
  nombre: string;
  ejercicios: ejercicio[];
}

class ejercicio {
  nombre_ejercicio: string;
  repeticiones: string;
  series: string;
}
