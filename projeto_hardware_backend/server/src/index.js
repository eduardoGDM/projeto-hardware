const express = require("express");
const app = express();

//settings

app.set("port", process.env.PORT || 8000);

// middlewares

app.use(express.json());

//Routes
app.use(require("./routes/user"));

//Startgin the serve
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
