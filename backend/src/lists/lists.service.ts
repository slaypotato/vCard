import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { List, ListDocument } from './schema/lists.schema'
import { CreateListDto } from './dtos/createList.dto';
import { UsersService } from 'src/users/users.service';
import mongoose from 'mongoose';

@Injectable()
export class ListsService {
    constructor(
        @InjectModel(List.name) private ListModel: Model<ListDocument>,
        private userService: UsersService
    ) {}

    async createNewList(newList: CreateListDto): Promise<List> {
        const id = uuid();
        Logger.log(`Saving list ${id}`);
        if (await this.userService.isUserValid(newList.ownerId)){
            const createdList = new this.ListModel({ _id: id, ...newList })
            return createdList.save();
        } else {
            Logger.log(`Unable to find OwnerId ${newList.ownerId}`);
            throw new BadRequestException('Unable to find OwnerId');
        }
        
    }

    async updateList(_id: string, list: any): Promise<any> {
        Logger.log(`Updated list ${_id}`);
        return this.ListModel.findByIdAndUpdate(_id, list);
    }

    async searchListById(id: string): Promise<any> {
        return this.ListModel.findById(id);
    }

    async searchListByOwner(ownerId: string): Promise<any> {
        Logger.log(`Returned all lists owned by ${ownerId}`);
        return this.ListModel.find({ownerId}).exec();
    }
}