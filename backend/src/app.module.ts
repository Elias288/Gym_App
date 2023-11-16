import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RutinaModule } from './rutina/rutina.module';
import { JwtProviders } from './jwt.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    ...JwtProviders,
    UsuarioModule,
    AuthModule,
    RutinaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
