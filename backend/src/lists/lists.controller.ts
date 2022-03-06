import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateListDto } from './dtos/createList.dto';
import { ListsService } from './lists.service';
import { List } from './schema/lists.schema';

@UseGuards(JwtAuthGuard)
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get(':id')
  async getListByIndex( @Param() { id }:any ): Promise<List> {
    return this.listsService.searchListById(id);
  }

  @Get('owner/:ownerId')
  async getListByOwnerId( @Param() { ownerId }:any ): Promise<any> {
    return this.listsService.searchListByOwner(ownerId);
  }

  @Post('new')
  async postNewList(@Body() newList:CreateListDto ): Promise<List> {
    return this.listsService.createNewList(newList);
  }

  @Put(':id')
  async putUpdateList(@Param() { id }:any, @Body() list:any ) {
    return this.listsService.updateList(id, list);
  }
  
}
