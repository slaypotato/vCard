import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: string;
    
    @Prop()
    userName: string;

    @Prop()
    password: string;

    @Prop()
    logoPath: string;

    @Prop()
    companyName: string;

    @Prop()
    description: string;
}

export const UserSchema = SchemaFactory.createForClass(User);