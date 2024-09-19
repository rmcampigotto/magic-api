import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaType } from "mongoose";

export type CommanderDocument = HydratedDocument<Commander>;

@Schema()
export class Commander {

    @Prop({ required: true, unique: true })
    commanderName: String;

    @Prop({ required: true })
    color: String;

    @Prop({ required: true })
    cards: Array<object>;

    @Prop({ required: true, ref: 'Users' })
    userId: Number;
}

export const CommanderSchema = SchemaFactory.createForClass(Commander);