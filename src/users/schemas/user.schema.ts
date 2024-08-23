import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Role } from "src/auth/roles/enums/roles.enum";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({required: true, unique: true })
    id: Number;

    @Prop({ required: true, unique: true })
    username: String;

    @Prop({ required: true })
    password: String;

    @Prop({ required: true })
    roles: Array<Role>

}

export const UserSchema = SchemaFactory.createForClass(User);
