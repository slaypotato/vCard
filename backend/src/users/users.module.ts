import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CloudToolsModule } from 'src/cloudTools/cloudTools.module';

@Module({
  imports: [ConfigModule, CloudToolsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
