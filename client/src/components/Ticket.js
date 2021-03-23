import React from "react";
import Content from "./Content";
import Labels from "./Labels";

export default function Ticket({
  title,
  userEmail,
  content,
  creationTime,
  labels,
  id,
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
      <button className="hideTicketButton" onClick={() => hide(id)}>
        hide
      </button>
    </div>
  );
}
