import mongoose, { Schema, model } from "mongoose";
const AutoIncrement = require('mongoose-sequence');

const commanderSchema = new Schema({
    commanderID: Number,
    name: { type: String, required: true },
    color: { type: String, required: true },
    cards: { type: Array<Object>, requires: true }
}, {
    timestamps: true
});

commanderSchema.plugin(AutoIncrement(mongoose), { inc_field: 'commanderID' });

export default model('Commander', commanderSchema);