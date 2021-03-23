import React from "react";
import Content from "./Content";
import Info from "./Info";

import "../styles/Ticket.css";

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
      <Content title={title} content={content} />
      <Info labels={labels} userEmail={userEmail} creationTime={creationTime} />
      <button className="hideTicketButton" onClick={() => hide(id)}>
        hide
      </button>
    </div>
  );
}
