import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Usuario } from './usuario.schema';

export type RutinaDocument = mongoose.HydratedDocument<Rutina>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Rutina {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  local_id: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  titulo: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  })
  usuario_id: Usuario;

  @Prop({
    required: true,
  })
  ejercicios: ejercicio[];
}

interface ejercicio {
  nombre_ejercicio: string;
  repeticiones: string;
  series: string;
}

export const RutinaSchema = SchemaFactory.createForClass(Rutina);
