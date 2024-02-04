import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsuarioDto } from './dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsuario(@Res() res: any) {
    const { _id: user_id } = res.req.user;
    return res.send(await this.usuarioService.getUsuarioById(user_id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: UsuarioDto) {
    return this.usuarioService.create(body);
  }

  @UseGuards(AuthGuard)
  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateUsuario(@Res() res: any, @Body() body: UpdateUsuarioDto) {
    const { localId } = res.req.user;
    return res.send(await this.usuarioService.updateUsuario(localId, body));
  }

  @UseGuards(AuthGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Res() res: any) {
    const { _id } = res.req.user;
    return res.send(await this.usuarioService.deleteUsuario(_id));
  }
}
