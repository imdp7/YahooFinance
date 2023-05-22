const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51FrsMEJyECnw5rCL4g5bJkAmDbIWUonjxMQG1h6NDhCaDQ9e29456MxLFFmWRZCf30PZILvtaP0J4FXvHdieWO8e0092YqW109"
);

router.use(bodyParser.json());
// tQRQSEfMZgqDJ2ct
// Replace <connection-string> and <database-name> with your values
// const connectionString = 'mongodb+srv://cluster06576.3kwannj.mongodb.net';
const databaseName = "YHFinance";
const connectionString =
  "mongodb+srv://Cluster06576:tQRQSEfMZgqDJ2ct@cluster06576.3kwannj.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// Define the subscription schema and model
const subscriptionSchema = new mongoose.Schema({
  customer: { type: Object, required: true },
  subType: { type: Object, required: false },
  invoice: { type: Object, required: false },
  subscriptionStatus: { type: String, required: true },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

// API endpoint to handle subscription data
router.post("/", (req, res) => {
  const subscription = req.body.subscriptions;

  // Extract necessary data from the subscription object
  const customer = subscription?.customer;
  const subType = subscription?.subType;
  const invoice = subscription?.invoice;
  const subscriptionStatus = subscription?.subscriptionStatus;

  // Store the subscription details in MongoDB Atlas
  const newSubscription = new Subscription({
    customer,
    subType,
    invoice,
    subscriptionStatus,
  });

  newSubscription
    .save()
    .then((savedSubscription) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error storing subscription:", error);
      res.sendStatus(500);
    });
});

// API endpoint to get all subscribers
router.get("/", (req, res) => {
  Subscription.find()
    .then((subscribers) => {
      if (subscribers) {
        res.setHeader("Content-Type", "application/json");
        res.json(subscribers);
      } else {
        res.status(404).json({ message: "Subscribers not found" });
      }
    })
    .catch((error) => {
      console.error("Error retrieving subscribers:", error);
      res.sendStatus(500);
    });
});

// API endpoint to get all customer through any value
router.get("/", (req, res) => {
  const query = req.query; // Get the query parameters from the request

  Subscription.find({
    $or: [
      { customer: { $regex: new RegExp(query, "i") } },
      { subType: { $regex: new RegExp(query, "i") } },
      { invoice: { $regex: new RegExp(query, "i") } },
      { subscriptionStatus: { $regex: new RegExp(query, "i") } },
    ],
  })
    .then((customers) => {
      if (customers.length > 0) {
        res.setHeader("Content-Type", "application/json");
        res.json(customers);
      } else {
        res.status(404).json({ message: "Customers not found" });
      }
    })
    .catch((error) => {
      console.error("Error searching for customers:", error);
      res.sendStatus(500);
    });
});

// API endpoint to delete a customer
router.delete("/:id", (req, res) => {
  const customerId = req.params.id;

  Subscription.findByIdAndDelete(customerId)
    .then((deletedCustomer) => {
      if (deletedCustomer) {
        res.json({ message: "Customer deleted successfully" });
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting customer:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
