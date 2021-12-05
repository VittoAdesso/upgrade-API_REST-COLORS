
const Palette = require("../models/Palette");

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const newPalette = async (req, res, next) => {
try {

const newPalette = new Palette();
newPalette.name = req.body.name;
newPalette.description = req.body.description;
newPalette.colors = req.body.colors;
newPalette.author = req.authority.id; 
const paletteDb = await newPalette.save()
return res.json({
status: 201,
message: HTTPSTATUSCODE[201],
data: { palettes: paletteDb }
});
} catch (err) {
return next(err);
}
}

const getAllPalettes = async (req, res, next) => {
try {
if (req.query.page) {
const page = parseInt(req.query.page);
const skip = (page - 1) * 20;
const palettes = await Palette.find().skip(skip).limit(20).populate("colors");
return res.json({
status: 200,
message: HTTPSTATUSCODE[200],
data: { palettes: palettes },
});
} else {
const palettes = await Palette.find().populate("colors");
return res.json({
status: 200,
message: HTTPSTATUSCODE[200],
data: { palettes: palettes },
});
}
} catch (err) {
return next(err);
}
};

const getPalettesById = async (req, res, next) => {
try {
const { paletteId } = req.params;
const paletteDb = await Palette.findById(paletteId).populate("colors");
return res.json({
status: 200,
message: HTTPSTATUSCODE[200],
data: { palettes: paletteDb },
});
} catch (err) {
return next(err);
}
};

const deletePaletteById = async (req, res, next) => {
try {
const { paletteId } = req.params;
const authority = req.authority.id
const userPalette = await Palette.findById(paletteId)
if (authority == userPalette.author._id) {
const paletteDeleted = await Palette.findByIdAndDelete(paletteId);
if (!paletteDeleted) {
return res.json({
status: 200,
message: "There is not a palette with that Id",
data: null
})
} else {
return res.json({
status: 200,
message: HTTPSTATUSCODE[200],
data: { palettes: paletteDeleted },
});
}
} else {
return res.json({
status: 403,
message: HTTPSTATUSCODE[403],
data: null
})
}
} catch (err) {
return next(err);
}
};

const updatePaletteById = async (req, res, next) => {
try {
const { paletteId } = req.params;
const authority = req.authority.id
const userPalette = await Palette.findById(paletteId)
if (authority == userPalette.author._id) {
const paletteToUpdate = new Palette();
if (req.body.name) paletteToUpdate.name = req.body.name;
if (req.body.description) paletteToUpdate.description = req.body.description;
if (req.body.colors) paletteToUpdate.colors = req.body.colors;
paletteToUpdate._id = paletteId;
const paletteUpdated = await Palette.findByIdAndUpdate(paletteId, paletteToUpdate);
return res.json({
status: 200,
message: HTTPSTATUSCODE[200],
data: { palettes: paletteUpdated }
});
} else {
return res.json({
status: 403,
message: HTTPSTATUSCODE[403],
data: null
})
}
} catch (err) {
return next(err);
}
}

const getAllPalettesByUser = async (req, res, next) => {
try {
const author = req.authority.id;
if (req.query.page) {
const page = parseInt(req.query.page);
const skip = (page - 1) * 20;
const allPalettesByUser = await Palette.find({ author: author }).skip(skip).limit(20).populate("colors");
return res.json({
status: 200,
message: HTTPSTATUSCODE[200],
data: { palettes: allPalettesByUser },
});
} else {
const allPalettesByUser = await Palette.find({ author: author }).populate("colors");
return res.json({
status: 200,
message: HTTPSTATUSCODE[200],
data: { palettes: allPalettesByUser },
});
}
} catch (err) {
return next(err)
}
}

module.exports = {
newPalette,
getAllPalettes,
getPalettesById,
deletePaletteById,
updatePaletteById,
getAllPalettesByUser}