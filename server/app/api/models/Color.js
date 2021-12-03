const mongoose = require("mongoose");

//schema met de mongoose
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
    hex: { type: String, require: true },
    name: { type: String, require: true },
    rgb: { type: String, require: true },
}, { timestamps: true });

// Exportamos el modelo para usarlo en otros ficheros
const Color = mongoose.model("colors", ColorSchema);
module.exports = Color;