import React from "react";
import Ticket from "./Ticket";

import "../styles/Tickets.css";

export default function Tickets({ tickets, hide, handleCommentSubmit }) {
  return (
    <div className="tickets">
      {tickets &&
        tickets.map(
          (
            { title, userEmail, content, creationTime, labels, id, comments },
            i
          ) => (
            <Ticket
              key={i}
              title={title}
              userEmail={userEmail}
              content={content}
              creationTime={creationTime}
              labels={labels}
              comments={comments}
              id={id}
              hide={hide}
              handleCommentSubmit={handleCommentSubmit}
            />
          )
        )}
    </div>
  );
}
