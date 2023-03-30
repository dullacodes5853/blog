
const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');


class Post extends Sequelize.Model {}

Post.init({
  title: Sequelize.STRING,
  body: Sequelize.STRING
}, {
  sequelize
});


module.exports = Post;
