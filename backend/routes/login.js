const express = require("express");
const usersDB = require("../database/users.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", {
    wrong: false,
    isLoggedIn: req.cookies.isLoggedIn,
    isAdmin: req.cookies.isAdmin,
  });
});

router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await usersDB.exists(username, password).catch(console.dir);
  if (user != false) {
    const isAdmin = user.admin;
    const username = user.username;
    res.cookie("isLoggedIn", true, { httpOnly: true });
    res.cookie("username", username, { httpOnly: true });
    if (isAdmin) {
      res.cookie("isAdmin", true, { httpOnly: true });
    }
    res.redirect("/");
  } else {
    res.render("login", {
      wrong: true,
      isLoggedIn: req.cookies.isLoggedIn,
      isAdmin: req.cookies.isAdmin,
    });
  }
});

module.exports = router;
