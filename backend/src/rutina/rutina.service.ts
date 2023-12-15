import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';
import { Rutina } from 'src/schemas/rutinas.schema';
import { UsuarioService } from 'src/usuario/usuario.service';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class RutinaService {
  constructor(
    private readonly usuarioService: UsuarioService,
    @InjectModel(Rutina.name) private rutinaModel: Model<Rutina>,
  ) {}

  async create(user_id: string, createRutinaDto: RutinaDto) {
    const usuario = await this.usuarioService.getUsuarioById(user_id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Busca si existe la rutina por su local_id
    const isRutina = await this.rutinaModel.findOne({
      local_id: createRutinaDto.local_id,
    });
    if (isRutina) throw new ConflictException('Rutina ya registrada');

    const mongoRutina = new this.rutinaModel({
      ...createRutinaDto,
      usuario_id: new mongoose.Types.ObjectId(user_id),
    });

    await mongoRutina.save();

    this.usuarioService.pushRutina(usuario, mongoRutina);
    return mongoRutina;
  }

  async findOne(rutina_local_id: string, user_id: string) {
    const usuario = await this.usuarioService.getUsuarioById(user_id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    return this.rutinaModel
      .findOne({ usuario_id: user_id, local_id: rutina_local_id })
      .exec();
  }

  findAllByUser(user_id: string) {
    return this.rutinaModel.find({ usuario_id: user_id }).exec();
  }

  async update(
    rutina_local_id: string,
    user_id: string,
    updateRutinaDto: UpdateRutinaDto,
  ) {
    if (!this.usuarioService.getUsuarioById(user_id))
      throw new NotFoundException('Usuario no encontrado');

    const rutina = await this.rutinaModel.findOneAndUpdate(
      { local_id: rutina_local_id },
      updateRutinaDto,
      { new: true },
    );

    return rutina;
  }

  async remove(rutina_local_id: string, user_id: string) {
    const usuario = await this.usuarioService.getUsuarioById(user_id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const rutina = await this.rutinaModel.findOneAndDelete({
      local_id: rutina_local_id,
    });
    if (!rutina) throw new NotFoundException('Rutina no encontrada');

    this.usuarioService.popRutina(rutina, usuario);
    return `Rutina #${rutina_local_id} eliminada`;
  }
}
