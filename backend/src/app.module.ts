import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import Joi from 'joi';
import { ListsModule } from './lists/lists.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_URI'),
        auth: {
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS')
        },
        dbName: 'vcard'
      }),
      inject:[ConfigService]
    }),
    ListsModule,
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}

