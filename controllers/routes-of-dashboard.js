const Router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

Router.get("/", withAuth, (req, res) => {
    Post.findAll({
      where: {
        userId: req.session.userId
      }
    })
      .then(PostData => {
        const posts = PostData.map((post) => post.get({ plain: true }));
        
        res.render("all-blog-posts-admin", {
          layout: "dashboard",
          posts
        });
      })
      .catch(err => {
        console.log(err);
        res.redirect("login");
      });
  });

  Router.get("/new", withAuth, (req, res) => {
    res.render("add-post", {
      layout: "dashboard"
    });
  });
  
  Router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id)
      .then(PostData => {
        if (PostData) {
          const post = PostData.get({ plain: true });
          
          res.render("edit-post", {
            layout: "dashboard",
            post
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
module.exports = Router;