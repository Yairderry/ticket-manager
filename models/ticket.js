const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userEmail: { type: String, default: "Anonymous" },
  done: { type: Boolean, default: false },
  creationTime: { type: Date, default: new Date().getTime() },
  labels: [{ type: String }],
  comments: [
    {
      id: { type: String },
      content: { type: String, required: true },
      userEmail: { type: String, default: "Anonymous" },
      comments: Array,
    },
  ],
});

ticketSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
