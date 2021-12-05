// importante para log in log out + generar tokens por cada sesión

const User = require("../models/User"); 
const bcrypt = require("bcrypt"); 

const jwt = require("jsonwebtoken"); 
const HTTPSTATUSCODE = require("../../utils/httpStatusCode"); 

const createUser = async (req, res, next) => {

try{
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.emoji = req.body.emoji;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.favPalettes = [];
    
    const userDb = await newUser.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: null
      });
} 
catch (err) {
    return next(err);
}
} 
    const authenticate = async (req, res, next) => {
    try {
// hago una búsqueda del usuario 
    const userInfo = await User.findOne({ email: req.body.email })

    if (bcrypt.compareSync(req.body.password, userInfo.password)) {

    userInfo.password = null
    // le creo token al usuario cuando se identifique
    const token = jwt.sign(
    {
    id: userInfo._id,
    name: userInfo.name
    },
    req.app.get("secretKey"),
    { expiresIn: "1h" }
    );
 
    return res.json({
    status: 200,
    message: HTTPSTATUSCODE[200],
    data: { user: userInfo, token: token },
    });
    } else {
    return res.json({ status: 400, message: HTTPSTATUSCODE[400], data: null });
    }
} catch (err) {
    return next(err);
    }
    }

    // cuando ya cierre sesión 
    const logout = (req, res, next) => {
    try {
    return res.json({
    status: 200,
    message: HTTPSTATUSCODE[200],
    token: null
    });
    } catch (err) {
    return next(err)
    }
    }


// siempre siempre, tienes que exportar los modulos para que funcionen
    module.exports = {
    createUser,
    authenticate,
    logout
    }



