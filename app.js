const express = require("express");
const { Error } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Ticket = require("./models/ticket");

const app = express();

app.use(express.static("client/build"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET methods
app.get("/api/tickets", (req, res) => {
  const { searchText } = req.query;
  Ticket.find({ title: new RegExp(searchText, "i") })
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      return res
        .status(500)
        .json({ error: "There was an error in our servers" });
    });
});

// PATCH methods
app.patch("/api/tickets/:ticketId/done", (req, res) => {
  const { ticketId } = req.params;
  Ticket.findByIdAndUpdate(ticketId, { $set: { done: true } }, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ error: "Ticket Not Found" });

      return res.json({ updated: true });
    })
    .catch((err) => {
      if (err.name === "CastError")
        return res.status(400).json({ error: "Invalid id" });

      return res
        .status(500)
        .json({ error: "There was an error in our server" });
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
        return res.status(400).json({ error: "Invalid id" });

      return res
        .status(500)
        .json({ error: "There was an error in our servers" });
    });
});

app.patch("/api/tickets/:ticketId/reply", async (req, res) => {
  const { ticketId } = req.params;
  const { commentId } = req.query;

  try {
    const id = uuidv4();
    const userEmail = req.body.userEmail ? req.body.userEmail : "Anonymous";
    const content = req.body.content ? req.body.content : new Error();

    const newComment = { id, userEmail, content, comments: [] };
    const data = await Ticket.findById(ticketId);
    if (!data) return res.status(404).json({ error: "Ticket Not Found" });

    const comments = data.comments ? data.comments : [];

    if (commentId) {
      const comment = findCommentById(comments, commentId);

      if (!comment) return res.status(404).json({ error: "Comment Not Found" });

      comment.comments.push(newComment);
    } else {
      comments.push(newComment);
    }

    await Ticket.findByIdAndUpdate(
      ticketId,
      { $set: { comments } },
      { new: true }
    );
    return res.json({ updated: true });
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ error: "Invalid id" });

    return res.status(500).json({ error: "There was an error in our servers" });
  }
});

// POST methods
app.post("/api/tickets/new-ticket", (req, res) => {
  const { labels } = req.body;

  const userEmail = req.body.userEmail ? req.body.userEmail : undefined;
  const title = req.body.title ? req.body.title : undefined;
  const content = req.body.content ? req.body.content : undefined;

  const ticket = new Ticket({ labels, content, title, userEmail });

  ticket
    .save()
    .then((savedTicket) => {
      return res.json(savedTicket);
    })
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(400).json({ error: err.message });

      return res
        .status(500)
        .json({ error: "There was an error in our servers" });
    });
});

// helper function
function findCommentById(comments, commentId) {
  if (comments.length === 0) return;

  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === commentId) return comments[i];
    return findCommentById(comments[i].comments, commentId);
  }
}

module.exports = app;
