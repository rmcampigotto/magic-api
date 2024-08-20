import mongoose, { Schema, model, Document } from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Definição do esquema Commander
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

// Adicionando auto incremento para o campo commanderID
commanderSchema.plugin(AutoIncrement, { inc_field: 'commanderID' });

export default model('Commander', commanderSchema);
