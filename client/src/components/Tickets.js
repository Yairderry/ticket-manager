import React from "react";
import Ticket from "./Ticket";

export default function Tickets({ tickets, hide }) {
  return (
    <div>
      {tickets &&
        tickets.map(
          ({ title, userEmail, content, creationTime, labels, id }, i) => (
            <Ticket
              key={i}
              title={title}
              userEmail={userEmail}
              content={content}
              creationTime={creationTime}
              labels={labels}
              id={id}
              hide={hide}
            />
          )
        )}
    </div>
  );
}
