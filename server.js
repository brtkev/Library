require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//express config
const app = express();
app.use("/", express.static(path.join(__dirname, "./webapp")));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))


require('./api/endpoints')(app);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));


