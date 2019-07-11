"user strict";

const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const apiRoutes = require("./server/routes/api");

//Connect to DB
let local = false;
let mlabUrl;
try {
  const keys = require("./keys");
  local = true;
  username = encodeURIComponent(keys.MLAB_USERNAME);
  pass = encodeURIComponent(keys.MLAB_PASSWORD);
  console.log("-------------------- LOCAL!!!");
} catch (e) {
  console.log("--------------------- Not LOCAL!");
  // Nothing
}

if (local) {
  const dbUrl = `mongodb://${username}:${pass}@ds161503.mlab.com:61503/elliotjz-pintrest-clone`;
  require("./server/models").connect(dbUrl);
} else {
  const dbUrl = `mongodb://${process.env.MLAB_USERNAME}:${
    process.env.MLAB_PASSWORD
  }@ds161503.mlab.com:61503/elliotjz-pintrest-clone`;
  require("./server/models").connect(dbUrl);
}

// ------ APP --------
const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "client/build")));

// -------- MIDDLEWARE ----------
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------- ROUTES ----------
apiRoutes(app);

// Send requests to the react app
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// --------- LISTEN ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
