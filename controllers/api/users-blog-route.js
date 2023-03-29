const router = require("express").Router();
const { User } = require("../../models");

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(UserData => {
    req.session.save(() => {
      req.session.userId = UserData.id;
      req.session.username = UserData.username;
      req.session.loggedIn = true;

      res.json(UserData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(UserData => {
    if (!UserData) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = UserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = UserData.id;
      req.session.username = UserData.username;
      req.session.loggedIn = true;
  
      res.json({ user: UserData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

router.delete("/user/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(UserData => {
    if (!UserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(UserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;