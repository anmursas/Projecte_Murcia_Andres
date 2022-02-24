const express = require("express");
const app = express();
const cors = require("cors");

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route 
app.get("/", (req, res) => {
  res.json({ message: "HOla" });
});

require("./app/routes/users.routes.js")(app);
require("./app/routes/notes.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
