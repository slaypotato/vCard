import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthConfig } from './auth/auth.config';
import { AuthService } from './auth/auth.service';
//import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule, HttpModule],
  //controllers: [AuthController],
  providers: [AuthConfig, AuthService],
  exports: [AuthService],
})
export class CloudToolsModule {}
