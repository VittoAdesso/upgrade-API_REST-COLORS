const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaletteSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    // es un  array de objetos ya que llama ids buscados 
    colors: [{ type: Schema.Types.ObjectId, ref: "colors", required: true }],
    author: { type: Schema.Types.ObjectId, ref: "users", required: true }
}, { timestamps: true });
const Palette = mongoose.model("palettes", PaletteSchema);
module.exports = Palette;