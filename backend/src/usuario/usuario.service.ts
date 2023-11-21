import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-usuario.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from 'src/schemas/usuario.schema';
import { RutinaDocument } from 'src/schemas/rutinas.schema';
import { UsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async getAll() {
    return this.usuarioModel.find().exec();
  }

  getUsuarioByUserName(user_name: string) {
    return this.usuarioModel.findOne({ user_name: user_name }).exec();
  }

  async create(createUserDto: UsuarioDto) {
    if (await this.usuarioModel.findOne({ local_id: createUserDto.local_id }))
      throw new ConflictException('Usuario ya existe');

    const mongoUser = new this.usuarioModel({ ...createUserDto, rutinas: [] });

    return mongoUser.save();
  }

  getUsuarioById(user_id: string) {
    return this.usuarioModel.findById(user_id).populate('rutinas');
  }

  updateUsuario(user_local_id: string, updatedUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioModel
      .findOneAndUpdate({ local_id: user_local_id }, updatedUsuarioDto)
      .exec();
  }

  pushRutina(usuario: UsuarioDocument, rutina: RutinaDocument) {
    this.usuarioModel
      .findByIdAndUpdate(
        usuario._id,
        { $push: { rutinas: rutina._id } },
        { new: true },
      )
      .exec();
  }

  popRutina(rutina: RutinaDocument, usuario: UsuarioDocument) {
    this.usuarioModel
      .findByIdAndUpdate(
        usuario._id,
        { $pull: { rutinas: rutina._id } },
        { new: true },
      )
      .exec();
  }
}
