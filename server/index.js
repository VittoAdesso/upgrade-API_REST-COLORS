const express = require("express");
const logger = require("morgan");

const { connect } = require("./app/config/database");

const users = require("./app/api/routes/user.routes");
const colors = require("./app/api/routes/color.routes");
const palettes = require("./app/api/routes/palette.routes");

const HTTPSTATUSCODE = require("./app/utils/httpStatusCode");
const cors = require("cors");

const PORT = 3001;
connect();

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.use(
    cors({
        origin: ["http://localhost:3001", "http://localhost:4200"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(logger("dev"));

app.use("/colors", colors);
// app.use("/palettes", palettes); 
// app.use("/users", users)


app.use((req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.message = HTTPSTATUSCODE[404];
    next(err);
});


app.set("secretKey", "nodeRestApi");

//Manejo  errores
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || "Unexpected error");
});


app.disable("x-powered-by");

//Levantamos el servidor
app.listen(PORT, () => {
    console.log(`Node is listening in: ${PORT}`);
});