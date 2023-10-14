const express = require("express");
const bodyParser = require("body-parser");

require('dotenv').config();
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync({force: true});

require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Сервис пользователей работает на ${PORT} порту.`);
});