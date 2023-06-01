const express = require("express");
const router = express.Router();
const Customer = require("../schema/customers");

// API get customers list
router.get("/", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((error) => {
      console.log("Error saving customer:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the customer" });
    });
});

// API get customer data through sub
router.get("/:sub", async (req, res) => {
  const sub = req.params.sub;

  try {
    // Find the customer by sub
    const customer = await Customer.findOne({ sub });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error retrieving customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API post customer to database
router.post("/:sub", async (req, res) => {
  const { email, symbol, email_verified, recentlyVisited } = req.body; // Assuming the request body contains the email and symbol
  const sub = req.params.sub;
  try {
    // Find the customer by email
    let customer = await Customer.findOne({ email });

    if (!customer) {
      // Customer doesn't exist, create a new customer with the symbol in the wishlist
      customer = new Customer({
        email,
        email_verified,
        sub,
        wishlist: { symbols: [symbol] },
        recentlyVisited: { symbols: [symbol] },
      });
    } else {
      // Customer exists, update the wishlist symbols
      const { symbols } = customer.wishlist;
      const symbolIndex = symbols.indexOf(symbol);

      if (symbolIndex !== -1) {
        // Symbol already exists, so remove it from the wishlist
        symbols.splice(symbolIndex, 1);
      } else {
        // Symbol doesn't exist, so add it to the wishlist
        symbols.push(symbol);
      }

      customer.markModified("wishlist"); // Notify Mongoose about the modified field

      // Update the recentlyVisited symbols array
      const { symbols: recentlyVisitedSymbols } = customer.recentlyVisited; // Fix the property name here

      if (!recentlyVisitedSymbols.includes(symbol)) {
        recentlyVisitedSymbols.push(symbol);
        customer.markModified("recentlyVisited.symbols");
      }
    }

    // Save the updated/created customer
    const updatedCustomer = await customer.save();

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("Error updating/creating wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to delete a customer
router.delete("/:id", (req, res) => {
  const customerId = req.params.id;

  Customer.findByIdAndDelete(customerId)
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
