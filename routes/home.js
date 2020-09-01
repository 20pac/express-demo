const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "My express app", message: "Hello Bokra" }); //Pug template (template name, {template argusments})
});

module.exports = router;
