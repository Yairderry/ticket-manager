import React from "react";

import "../styles/NewTicketForm.css";

export default function NewTicketForm({ handleSubmit }) {
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
        <label htmlFor="userEmail">Email</label>
        <input
          className="newTicketInput"
          type="email"
          name="userEmail"
          id="userEmail"
          autoComplete="off"
        />
        <label htmlFor="title">Title</label>
        <input
          className="newTicketInput"
          name="title"
          id="title"
          autoComplete="off"
          required
        />
        <label htmlFor="content">Content</label>
        <input
          className="newTicketInput"
          name="content"
          id="content"
          autoComplete="off"
        />
        <label htmlFor="labels">labels</label>
        <select className="newTicketInput" name="labels" id="labels" multiple>
          <option value="asdf">asdf</option>
          <option value="qwer">qwer</option>
          <option value="zxcv">zxcv</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
