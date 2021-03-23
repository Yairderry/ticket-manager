import React from "react";

export default function Content({ title, userEmail, content, creationTime }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>
        By {userEmail} | {new Date(creationTime).toDateString()}
      </p>
    </div>
  );
}
