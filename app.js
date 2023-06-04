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
const ratesRoute = require("./routes/rates");
//CATECORY AND AUTHOR ROUTES
const categoryRouter = require("./routes/category");
const authorRouter = require("./routes/author");
const port = 8080;
app.use(cors());
app.use(express.json());
/**********************************************************************/
//routes-books
const bookRoute = require("./routes/books");
//ROUTES
app.use("/users", usersRoutes);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/userbooks", userBooksRoutes);
app.use("/reviews", reviewsRoute);
app.use(express.static("assets")); //show images in chrome
app.use("/category", categoryRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRoute);
app.use("/rates", ratesRoute);

app.post("/welcome", auth, (req, res) => {
  res.status(200).send(true);
});

/**********************************************************************/
mongoose.set("strictQuery", false);
//CONNECT WITH DATA BASE
mongoose.connect(
  "mongodb+srv://khaled-Ellithy:meanstack@cluster0.xopyoua.mongodb.net/GoodReads?retryWrites=true&w=majority",
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
