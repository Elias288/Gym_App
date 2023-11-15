import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';
import { Rutina } from './entities/rutina.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class RutinaService {
  private rutinas: Rutina[] = [];
  constructor(private readonly usuarioService: UsuarioService) {}

  create(userLocalId: string, createRutinaDto: CreateRutinaDto) {
    if (!this.usuarioService.getUsuarioById(userLocalId))
      throw new NotFoundException('Usuario no encontrado');

    if (this.rutinas.find((rut) => rut.local_id === createRutinaDto.local_id))
      throw new ConflictException('rutina ya existe');

    this.rutinas.push({ ...createRutinaDto, usuario_id: userLocalId });
    return createRutinaDto;
  }

  findAll(userLocalId: string) {
    if (!this.usuarioService.getUsuarioById(userLocalId))
      throw new NotFoundException('Usuario no encontrado');

    return this.rutinas;
  }

  findOne(rutina_id: string, userLocalId: string) {
    if (!this.usuarioService.getUsuarioById(userLocalId))
      throw new NotFoundException('Usuario no encontrado');

    return this.rutinas.find((rutina) => rutina.local_id === rutina_id);
  }

  update(
    rutina_id: string,
    userLocalId: string,
    updateRutinaDto: UpdateRutinaDto,
  ) {
    if (!this.usuarioService.getUsuarioById(userLocalId))
      throw new NotFoundException('Usuario no encontrado');

    const indexRutina = this.rutinas.findIndex(
      (rutina) => rutina.local_id === rutina_id,
    );

    if (indexRutina === -1) throw new NotFoundException('Rutina no encontrada');

    const rutina = { ...this.rutinas[indexRutina], ...updateRutinaDto };
    this.rutinas[indexRutina] = rutina;
    return rutina;
  }

  remove(rutina_id: string, userLocalId: string) {
    if (!this.usuarioService.getUsuarioById(userLocalId))
      throw new NotFoundException('Usuario no encontrado');

    if (!this.rutinas.find((rutina) => rutina.local_id === rutina_id))
      throw new NotFoundException('Rutina no encontrada');

    const newRutinas = this.rutinas.filter(
      (rutina) => rutina.local_id !== rutina_id,
    );

    this.rutinas = newRutinas;
    return `Rutina #${rutina_id} eliminada`;
  }
}
