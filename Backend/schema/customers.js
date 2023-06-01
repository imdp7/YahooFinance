const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  email_verified: { type: Boolean, required: false },
  sub: { type: String, required: true },
  wishlist: { type: Object, default: {symbols: []} },
  recentlyVisited: { type: Object, default: {symbols: []} },
});
const Customer = mongoose.model("Customer", customersSchema);
module.exports = Customer;
