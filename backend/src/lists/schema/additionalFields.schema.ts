import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdditionalFieldsDocument = AdditionalFields & Document;

@Schema()
export class AdditionalFields {
    [key: string]: string|number;
}

export const AdditionalFieldsSchema = SchemaFactory.createForClass(AdditionalFields);