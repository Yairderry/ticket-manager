import React from "react";
import SearchArea from "./SearchArea";

export default function Header({
  filterTickets,
  hiddenTickets,
  restoreTicketsList,
}) {
  return (
    <header>
      <h1>Ticket Manager</h1>
      <SearchArea filterTickets={filterTickets} />
      <h2>
        Hidden tickets:{" "}
        <span id="hideTicketsCounter">{hiddenTickets.length}</span>
      </h2>
      <button id="restoreHideTickets" onClick={restoreTicketsList}>
        restore
      </button>
    </header>
  );
}
