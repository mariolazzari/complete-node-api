const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error while connecting to MongoDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean
});

const Course = new mongoose.model("Course", courseSchema);
const createCourse = async () => {
  const course = new Course({
    name: "Mongo course",
    author: "Mario",
    tags: ["mongo", "javascript"],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
};
//createCourse();

const getCourses = async () => {
  const courses = await Course.find({ author: "Mario", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    //.select({ name: 1, tags: 1 })
    .countDocuments();
  console.log(courses);
};
getCourses();
