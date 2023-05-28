const cors = require("cors");
const express = require("express");
const app = express();
const auth = require("./middleware/auth");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const userBooksRoutes = require("./routes/userBooks");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const reviewsRoute = require("./routes/reviews");
//CATECORY AND AUTHOR ROUTES
const categoryRouter = require("./routes/category");
const authorRouter = require("./routes/author");
const port = 8080;
app.use(cors());
app.use(express.json());
/**********************************************************************/
//ROUTES
app.use("/users", usersRoutes);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/userbooks", userBooksRoutes);
app.use("/reviews", reviewsRoute);
app.use(express.static("assets")); //show images in chrome
app.use("/category", categoryRouter);
app.use("/author", authorRouter);
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌");
});
/**********************************************************************/
mongoose.set("strictQuery", false);
//CONNECT WITH DATA BASE
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

/**********************************************************************/
app.listen(port, (err) => {
  if (!err) console.log(`App is working on port ${port}`);
});
