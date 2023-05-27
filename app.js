const cors = require("cors");
const express = require("express");
const app = express();
const auth = require("./middleware/auth");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const userBooksRoutes = require("./routes/userBooks");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const reviewsRoute = require("./routes/reviews")

app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/userbooks", userBooksRoutes);
app.use("/reviews", reviewsRoute);
app.use(express.static('assets'))//show images in chrome

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌");
});

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://127.0.0.1:27017/readApp",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("DB Is Connected  Successfully :)");
    } else {
      console.log("DB Failed To connect ):");
    }
  }
);

app.listen(3000, (err) => {
  if (!err) console.log("App is working on port 3000");
});
