const Joi = require("joi");
const express = require("express");

const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" }
];

app.get("/", (req, res) => {
  res.send("ciao");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (course) {
    res.send(course);
  } else {
    res.status(404).send("Course not found.");
  }
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  res.send([...courses, course]);
});

app.put("/api/courses/:id", (req, res) => {
  // check if course exists
  const id = parseInt(req.params.id);
  const course = courses.find(c => c.id === id);
  if (!course) {
    res.status(404).send("Course not found.");
    return;
  }

  // validate update
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // update course
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // check if course exists
  const id = parseInt(req.params.id);
  const course = courses.find(c => c.id === id);
  if (!course) return res.status(404).send("Course not found.");

  const idx = courses.indexOf(course);
  courses.splice(idx, 1);
  res.send(course);
});

// course validation
const validateCourse = course => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express stated on port ${PORT}`));
