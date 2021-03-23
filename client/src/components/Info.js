import React from "react";
import Labels from "./Labels";

export default function Info({ labels, userEmail, creationTime }) {
  return (
    <div className="ticketInfo">
      <span className="info">
        By {userEmail} | {new Date(creationTime).toDateString()}
      </span>
      <Labels labels={labels} />
    </div>
  );
}
