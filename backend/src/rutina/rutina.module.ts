import { Module } from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { RutinaController } from './rutina.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [RutinaController],
  providers: [RutinaService, AuthGuard],
})
export class RutinaModule {}
