const express = require("express");
const app = express();

// Import Routes
const indexRoutes = require("./routes/index");
const stripeRoutes = require("./routes/stripe");

const hostname = "127.0.0.1";
const port = 3000;

//Use Routes
app.use(express.json())
app.use("/api", indexRoutes);
app.use("/api/create-customer", stripeRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/api/`);
});
