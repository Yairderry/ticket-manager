import React from "react";

export default function Content({ title, content }) {
  return (
    <div className="ticketContent">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
