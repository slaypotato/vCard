import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { List, ListSchema } from './schema/lists.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]), 
    UsersModule
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
