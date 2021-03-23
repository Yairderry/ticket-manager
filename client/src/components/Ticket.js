import React from "react";
import Content from "./Content";
import Labels from "./Labels";

export default function Ticket({
  title,
  userEmail,
  content,
  creationTime,
  labels,
  ticket,
  hide,
}) {
  return (
    <div className="ticket">
      <Content
        title={title}
        userEmail={userEmail}
        content={content}
        creationTime={creationTime}
      />
      <Labels labels={labels} />
      <button className="hideTicketButton" onClick={() => hide(ticket)}>
        hide
      </button>
    </div>
  );
}
