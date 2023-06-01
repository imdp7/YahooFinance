const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors package
require('dotenv').config();

// Import Routes
const indexRoutes = require("./routes/index");
const customersRoutes = require("./routes/customers");
const subscribeRoute = require("./routes/subscribe");

const hostname = process.env.HOSTNAME || "127.0.0.1"; // Use the environment variable for hostname or default to "127.0.0.1"
const port = process.env.PORT || 3000; // Use the environment variable for port or default to 3000


app.use(cors()); // Use the cors middleware

//Use Routes
app.use(express.json());
app.use("/api", indexRoutes);
app.use("/api/subscribe", subscribeRoute);
app.use("/api/customers", customersRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/api/`);

});
