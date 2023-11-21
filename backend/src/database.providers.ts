import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: `mongodb://${configService.get<string>(
        'DB_USER',
      )}:${configService.get<string>(
        'DB_PASSWORD',
      )}@${configService.get<string>('MONGO_URL')}/?authMechanism=DEFAULT`,
      dbName: 'gymAppMongo',
    }),
    inject: [ConfigService],
  }),
];
