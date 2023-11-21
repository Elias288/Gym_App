import { Module } from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { RutinaController } from './rutina.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Rutina, RutinaSchema } from 'src/schemas/rutinas.schema';

@Module({
  imports: [
    UsuarioModule,
    MongooseModule.forFeature([{ name: Rutina.name, schema: RutinaSchema }]),
  ],
  controllers: [RutinaController],
  providers: [RutinaService, AuthGuard],
})
export class RutinaModule {}
