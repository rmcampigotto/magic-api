import mongoose, { Schema, model } from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commanderSchema = new Schema({
    commanderID: Number,
    name: { type: String, required: true },
    color: { type: String, required: true },
    cards: [{
        name: { type: String, required: true },
        color: { type: String, required: true },
        Ability: { type: String, required: true }
    }]
}, {
    timestamps: true
});

commanderSchema.plugin(AutoIncrement, { inc_field: 'commanderID' });

export default model('Commander', commanderSchema);
