//Dependencies
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 4040;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });