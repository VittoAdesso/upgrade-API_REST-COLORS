const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Node Server listen in PORT: ${PORT}`)
});