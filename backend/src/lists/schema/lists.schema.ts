import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from './product.schema';

export type ListDocument = List & Document;

@Schema()
export class List {
    @Prop()
    _id: string;

    @Prop()
    ownerId: string;
    
    @Prop()
    listName: string;

    @Prop()
    products: Product[];
}

export const ListSchema = SchemaFactory.createForClass(List);