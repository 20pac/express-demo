const config = require("config");
const express = require("express");
const Joi = require("joi");
const logger = require("./logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

//Middleware to parse body
//These middlewares are called in sequence

app.use(express.json()); //Populates request body
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //Serves static content in public folder
//Handle the /api/courses route using the courses object
app.use("/api/courses", courses);
app.use("/", home);

app.use(logger);

//Getting configuration settings using config
console.log(config.get("name"));

//Set view engine
app.set("view engine", "pug");
app.set("views", "./views"); //path to views

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}....`));
