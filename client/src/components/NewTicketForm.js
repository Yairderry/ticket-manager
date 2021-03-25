import React from "react";

import "../styles/NewTicketForm.css";

export default function NewTicketForm({ handleSubmit }) {
  const labels = [
    "Help",
    "Tech",
    "Guidelines",
    "Corvid",
    "Api",
    "Collapse",
    "Expand",
    "Problem",
    "Login",
    "Tutorial",
    "View Count",
  ];
  return (
    <div className="blurBackground hideForm">
      <form className="newTicketForm" onSubmit={handleSubmit}>
        <span
          className="exitButton"
          onClick={(e) => {
            e.target.parentElement.parentElement.classList.add("hideForm");
          }}
        >
          X
        </span>
        <label className="formLabel" htmlFor="userEmail">
          Email
        </label>
        <input
          className="newTicketInput"
          type="email"
          name="userEmail"
          id="userEmail"
          autoComplete="off"
        />
        <label className="formLabel" htmlFor="title">
          Title
        </label>
        <input
          className="newTicketInput"
          name="title"
          id="title"
          autoComplete="off"
          required
        />
        <label className="formLabel" htmlFor="content">
          Content
        </label>
        <textarea
          className="newTicketInput"
          name="content"
          id="content"
          autoComplete="off"
          rows="6"
          cols="50"
        />
        <label className="formLabel" htmlFor="labels">
          labels
        </label>
        <select className="newTicketInput" name="labels" id="labels" multiple>
          {labels.map((label, i) => (
            <option key={i} value={label}>
              {label}
            </option>
          ))}
        </select>
        <input className="submitTicket" type="submit" value="Submit" />
      </form>
    </div>
  );
}
