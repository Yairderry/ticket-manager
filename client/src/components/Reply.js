import React from "react";
import "../styles/Reply.css";

export default function Reply({ handleCommentSubmit, ticketId, commentId }) {
  return (
    <form
      className="reply"
      onSubmit={(e) => {
        handleCommentSubmit(e, ticketId, commentId ? commentId : "");
      }}
    >
      <button className="fa fa-reply replyButton" />
      <div className="replyInputs">
        <input
          className="replyInput"
          name="userEmail"
          type="email"
          placeholder="Enter email here..."
          autoComplete="off"
        />
        <input
          className="replyInput"
          name="content"
          placeholder="Enter comment here..."
          autoComplete="off"
          required
        />
      </div>
    </form>
  );
}
