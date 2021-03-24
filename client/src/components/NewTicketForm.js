import React from "react";

import "../styles/NewTicketForm.css";

export default function NewTicketForm() {
  return (
    <div className="blurBackground hideForm">
      <form
        className="newTicketForm"
        action="/api/tickets/new-ticket"
        method="POST"
      >
        <div>
          <label htmlFor="userEmail">Email</label>
          <input
            className="newTicketInput"
            type="email"
            name="userEmail"
            id="userEmail"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="newTicketInput"
            name="title"
            id="title"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <input
            className="newTicketInput"
            name="content"
            id="content"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="labels">labels</label>
          <select className="newTicketInput" name="labels" id="labels" multiple>
            <option value="asdf">asdf</option>
            <option value="qwer">qwer</option>
            <option value="zxcv">zxcv</option>
          </select>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <button
        onClick={(e) => {
          e.target.parentElement.classList.add("hideForm");
        }}
      >
        Go Back
      </button>
    </div>
  );
}
