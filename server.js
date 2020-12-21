const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect DB
connectDB();

//init middleware for body parser
app.use(express.json({ extended: false }));

//test
app.get("/", (req, res) => res.send("API Running"));

//define routes --> app.use(req, res)
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

//listen to app var on PORT or go to locahost5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
