import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-usuario.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from 'src/schemas/usuario.schema';
import { RutinaDocument } from 'src/schemas/rutinas.schema';
import { UsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

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
    // Busca el usuario por el local_id o en user_name
    const isUser = await this.usuarioModel.findOne({
      $or: [
        { local_id: createUserDto.local_id },
        { user_name: createUserDto.user_name },
      ],
    });
    if (isUser) throw new ConflictException('Usuario ya registrado');

    const mongoUser = new this.usuarioModel({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 8),
      rutinas: [],
      selectedRoutineId: '',
    });

    return mongoUser.save();
  }

  getUsuarioById(user_id: string) {
    return this.usuarioModel.findById(user_id);
  }

  updateUsuario(user_local_id: string, updatedUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioModel
      .findOneAndUpdate({ local_id: user_local_id }, updatedUsuarioDto, {
        new: true,
      })
      .exec();
  }

  async deleteUsuario(user_id: string) {
    // Antes de eliminar el usuario, eliminamos las rutinas asignadas
    const user = await this.usuarioModel.findById(user_id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usuarioModel.updateMany(
      { routines: { $in: user.rutinas } },
      { $pull: { routines: { $in: user.rutinas } } },
    );
    return this.usuarioModel.findOneAndDelete({ _id: user._id });
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
