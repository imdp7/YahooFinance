const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors package

// Import Routes
const indexRoutes = require("./routes/index");
const stripeRoutes = require("./routes/stripe");
const subscribeRoute = require("./routes/subscribe");

const hostname = "127.0.0.1";
const port = 3000;

app.use(cors()); // Use the cors middleware

//Use Routes
app.use(express.json());
app.use("/api", indexRoutes);
app.use("/api/subscribe", subscribeRoute);
app.use("/api/create-customer", stripeRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/api/`);
});
