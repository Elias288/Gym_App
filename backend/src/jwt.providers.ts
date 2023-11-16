import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const JwtProviders = [
  JwtModule.registerAsync({
    global: true,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('TOKEN_SECRET'),
    }),
    inject: [ConfigService],
  }),
];
