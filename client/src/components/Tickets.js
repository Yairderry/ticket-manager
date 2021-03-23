import React from "react";
import Ticket from "./Ticket";

export default function Tickets({ tickets, hide }) {
  return (
    <div>
      {tickets &&
        tickets.map((ticket, i) => (
          <Ticket
            key={i}
            title={ticket.title}
            userEmail={ticket.userEmail}
            content={ticket.content}
            creationTime={ticket.creationTime}
            labels={ticket.labels}
            ticket={ticket}
            hide={hide}
          />
        ))}
    </div>
  );
}
