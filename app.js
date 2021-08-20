// packages
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
// routers
const categoryRouter = require("./src/routers/category_router");
const bookRouter = require("./src/routers/book_router");
// response class
const Response = require("./src/Response");

// db connection
require("./src/config/db_connection");

// app
const app = express();

// enable all cors requests
app.use(cors());

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static file middleware
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my books API!" });
});

app.use("/api/category", categoryRouter);

app.use("/api/book", bookRouter);

// 404 route
app.use((req, res, next) => {
  return new Response().notFound(res);
});

// app start
app.listen(process.env.PORT, () => {
  console.log(`App listening at ${process.env.WEB_SITE_URL} 🚀 `);
});
