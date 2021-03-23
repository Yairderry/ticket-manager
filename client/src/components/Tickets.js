import React from "react";
import Ticket from "./Ticket";

export default function Tickets({ tickets }) {
  return (
    <div>
      {tickets &&
        tickets.map(
          ({ title, userEmail, content, creationTime, labels }, i) => (
            <Ticket
              key={i}
              title={title}
              userEmail={userEmail}
              content={content}
              creationTime={creationTime}
              labels={labels}
            />
          )
        )}
    </div>
  );
}
