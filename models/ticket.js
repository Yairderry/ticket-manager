const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userEmail: { type: String, required: true },
  done: { type: Boolean, required: true },
  creationTime: { type: Date, required: true },
  labels: [{ type: String }],
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
