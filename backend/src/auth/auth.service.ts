import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user_name: string, encriptedPassword: string) {
    if (!(user_name && encriptedPassword)) return -1;

    // busca el usuario en la lista de usuarios
    const usuario = await this.usuarioService.getUsuarioByUserName(user_name);

    // si el usuario no existe
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // compara las contraseñas hasheadas
    const password = await bcrypt.compare(encriptedPassword, usuario.password);
    // si las contraseñas no coinciden
    if (!password) throw new UnauthorizedException('Contraseña erronea');

    const payload = {
      _id: usuario._id,
      localId: usuario.local_id,
      username: usuario.user_name,
    };

    // retorna el token
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
