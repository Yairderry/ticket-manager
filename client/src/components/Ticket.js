import React from "react";
import Content from "./Content";
import Labels from "./Labels";

export default function Ticket({
  title,
  userEmail,
  content,
  creationTime,
  labels,
}) {
  return (
    <>
      <Content
        title={title}
        userEmail={userEmail}
        content={content}
        creationTime={creationTime}
      />
      <Labels labels={labels} />
    </>
  );
}
