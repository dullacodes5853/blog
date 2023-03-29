const Routing = require("express").Router();
const { Post, Comment, User } = require("../models");

Routing.get("/", (req, res) => {
  Post.findAll({
    include: [User],
  })
    .then((PostData) => {
      const posts = PostData.map((post) => post.get({ plain: true }));
      res.render("all-blog-posts", { posts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


Routing.get("/post/:id", (req, res) => {
  Post.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })
    .then((PostData) => {
      if (PostData) {
        const post = PostData.get({ plain: true });

        res.render("single-blog", { post });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

Routing.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

Routing.get("/Register", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("Register");
});
module.exports = Routing;