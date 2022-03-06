import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AdditionalFields } from './additionalFields.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    _id: string;
    
    @Prop()
    productName: string;

    @Prop()
    Description: string;
    
    @Prop()
    Unit: string;

    @Prop()
    pricePerUnit: number;

    @Prop()
    picturePath: string;

    @Prop()
    additionalFields: AdditionalFields[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);