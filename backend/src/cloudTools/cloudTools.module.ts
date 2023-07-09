import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthConfig } from './auth.config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthConfig, AuthService],
  exports: [],
})
export class CloudToolsModule {}
