import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CloudToolsModule } from './cloudTools/cloudTools.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, CloudToolsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
