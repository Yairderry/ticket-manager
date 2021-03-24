import React from "react";
import NewTicketForm from "./NewTicketForm";
import SearchArea from "./SearchArea";

export default function Header({
  filterTickets,
  hiddenTickets,
  restoreTicketsList,
}) {
  return (
    <header>
      <NewTicketForm />
      <h1>Ticket Manager</h1>
      <SearchArea filterTickets={filterTickets} />
      <p>
        Hidden Tickets:{" "}
        <span id="hideTicketsCounter">{hiddenTickets.length}</span>
      </p>
      <button id="restoreHideTickets" onClick={restoreTicketsList}>
        Restore
      </button>
      <button
        onClick={(e) => {
          e.target.parentElement.firstChild.classList.remove("hideForm");
        }}
      >
        Add Ticket
      </button>
    </header>
  );
}
