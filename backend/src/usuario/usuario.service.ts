import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-usuario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  private readonly usuarios: Usuario[] = [];

  create(newUser: CreateUsuarioDto) {
    if (this.usuarios.find((user) => user.local_id == newUser.local_id))
      throw new ConflictException('Usuario ya existe');

    this.usuarios.push(newUser);
    return newUser;
  }

  getUsuarioById(usuarioId: string) {
    return this.usuarios.find((usuario) => usuario.local_id === usuarioId);
  }

  getUsuarioByUserName(username: string) {
    return this.usuarios.find((usuario) => usuario.user_name === username);
  }

  getUsuarioInfo(user_id: string) {
    const user = this.getUsuarioById(user_id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  updateUsuario(user_id: string, body: UpdateUsuarioDto) {
    const indexUser = this.usuarios.findIndex(
      (user) => user.local_id === user_id,
    );
    if (indexUser === -1) throw new NotFoundException('Usuario no encontrado');

    const user = { ...this.usuarios[indexUser], ...body };
    this.usuarios[indexUser] = user;

    return user;
  }
}
