import express from "express";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
