import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RutinaModule } from './rutina/rutina.module';
import { JwtProviders } from './jwt.providers';
import { databaseProviders } from './database.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    ...JwtProviders,
    ...databaseProviders,
    UsuarioModule,
    AuthModule,
    RutinaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
