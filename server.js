const path = require("path");
const express = require("express");
const session = require("express-session");
const sbh = require("express-handlebars");
const web = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection.js");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const acc = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

web.use(session(acc));

const hbs = sbh.create({
  helpers: {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  }
});

web.engine("handlebars", hbs.engine);
web.set("view engine", "handlebars");

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(express.static(path.join(__dirname, "public")));

web.use(require('./controllers/'));

web.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});