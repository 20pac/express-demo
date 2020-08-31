const express = require("express");
const Joi = require("joi");
const app = express();

//Middleware to parse body
app.use(express.json());

const courses = [
  {
    id: 1,
    name: "JavaScript",
  },
  {
    id: 2,
    name: "React",
  },
  {
    id: 3,
    name: "Redux",
  },
  {
    id: 4,
    name: "Node",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!!</h1>");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//Route Parameters
//Use req.params.id to access id
app.get("/api/courses/:id", (req, res) => {
  let course = courses.find((course) => course.id === parseInt(req.params.id));
  if (course) {
    res.send(course);
  } //404
  else {
    res.status(404).send("Dont fucking bullshit me");
  }
});

app.post("/api/courses", (req, res) => {
  //Joi stuff
  const result = validateCourse(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const newCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };
  console.log(newCourse);
  courses.push(newCourse);
  res.send(newCourse);
});

app.put("/api/courses/:id", (req, res) => {
  //Check if an element with given id exists
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  //If no such course exists, send error
  if (!course) {
    res.status(404).send("No such course exists");
    return;
  }
  //If course exists, validate the data that is sent
  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  //If you reach here, no errors occured, so update the data
  //You can directly change name since course directly points to the object we want
  course.name = req.body.name;
  res.send(courses);
});

app.delete("/api/courses/:id", (req, res) => {
  //Check if an element with given id exists
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  //If no such course exists, send error
  if (!course) {
    res.status(404).send("No such course exists");
    return;
  }
  courses.splice(courses.indexOf(course), 1);
  res.send(course);
});

//Validates the course
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}....`));
