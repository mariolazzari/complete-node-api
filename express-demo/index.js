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
    res.status(200).send("Course not found.");
  }
});

app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  res.send([...courses, course]);
});

/*
app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course) {
      res.send(course);
    } else {
      res.status(200).send("Course not found.");
    }
  });
  */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express stated on port ${PORT}`));
