const express = require("express");
const Ticket = require("./models/ticket");

const app = express();

app.use(express.static("client/build"));

// GET methods
app.get("/api/tickets", (req, res) => {
  const { searchText } = req.query;
  Ticket.find({ title: new RegExp(searchText, "gi") }).then((data) => {
    res.json(data);
  });
});

// PATCH methods
app.patch("/api/tickets/:ticketId/done", (req, res) => {
  const { ticketId } = req.params;
  console.log(ticketId);
  Ticket.findByIdAndUpdate(ticketId, { $set: { done: true } }, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ error: "Ticket Not Found" });

      return res.json({ updated: true });
    })
    .catch((err) => {
      if (err.name === "CastError")
        res.status(400).json({ error: err.message });
    });
});

app.patch("/api/tickets/:ticketId/undone", (req, res) => {
  const { ticketId } = req.params;
  Ticket.findByIdAndUpdate(ticketId, { $set: { done: false } }, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ error: "Ticket Not Found" });

      return res.json({ updated: true });
    })
    .catch((err) => {
      if (err.name === "CastError")
        res.status(400).json({ error: err.message });
    });
});

module.exports = app;
