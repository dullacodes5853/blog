const Router = require('express').Router();

const UserRoutes = require('./users-blog-route.js');
const PostRoutes = require('./posts-blog-route');
const commentRoutes = require('./comments-blog-route');

Router.use('/user', UserRoutes);
Router.use('/post', PostRoutes);
Router.use('/comment', commentRoutes);

module.exports = Router;