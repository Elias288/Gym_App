import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getUsuario(@Res() res: any) {
    const { localId } = res.req.user;
    return res.send(this.usuarioService.getUsuarioInfo(localId));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateUsuarioDto) {
    try {
      return this.usuarioService.create(body);
    } catch (error) {
      throw new ConflictException('Usuario ya existe');
    }
  }

  @UseGuards(AuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  updateUsuario(@Res() res: any, @Body() body: UpdateUsuarioDto) {
    const { localId } = res.req.user;
    return res.send(this.usuarioService.updateUsuario(localId, body));
  }
}
