const router = require("express").Router();

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" }
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (course) {
    res.send(course);
  } else {
    res.status(404).send("Course not found.");
  }
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
