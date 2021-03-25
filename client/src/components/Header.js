import React from "react";
import NewTicketForm from "./NewTicketForm";
import SearchArea from "./SearchArea";

import "../styles/Header.css";

export default function Header({
  filterTickets,
  hiddenTickets,
  restoreTicketsList,
  handleSubmit,
}) {
  return (
    <header>
      <NewTicketForm handleSubmit={handleSubmit} />
      <h1>Ticket Manager</h1>
      <SearchArea filterTickets={filterTickets} />
      <p>
        Hidden Tickets:{" "}
        <span id="hideTicketsCounter">{hiddenTickets.length}</span>
        {hiddenTickets.length > 0 && (
          <span id="restoreHideTickets" onClick={restoreTicketsList}>
            Restore
          </span>
        )}
      </p>
      <span
        className="fa fa-plus-circle fa-3x addTicket"
        onClick={(e) => {
          e.target.parentElement.firstChild.classList.remove("hideForm");
        }}
      ></span>
    </header>
  );
}
