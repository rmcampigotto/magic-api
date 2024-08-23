import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CommanderDocument = HydratedDocument<Commander>;

@Schema()
export class Commander {

    @Prop({ required: true, unique: true })
    commanderName: String;

    @Prop({ required: true })
    color: String;

    @Prop({ required: true })
    cards: Array<object>;

}

export const CommanderSchema = SchemaFactory.createForClass(Commander);