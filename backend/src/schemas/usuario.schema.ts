import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Rutina } from './rutinas.schema';

// Esquema de usuario en la BD

export type UsuarioDocument = mongoose.HydratedDocument<Usuario>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Usuario {
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
  user_name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Rutina' })
  rutinas: Rutina[];

  @Prop({
    trim: true,
  })
  nombre?: string;

  @Prop()
  altura?: string;

  @Prop()
  peso?: string;

  @Prop()
  genero?: string;

  @Prop()
  selectedRoutineId: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
