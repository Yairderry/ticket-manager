import React from "react";

export default function Reply({ handleCommentSubmit, ticketId, commentId }) {
  return (
    <form
      onSubmit={(e) => {
        handleCommentSubmit(e, ticketId, commentId ? commentId : "");
      }}
    >
      <button>Reply</button>
      <input name="userEmail" type="email" placeholder="Enter email here..." />
      <input name="content" placeholder="Enter comment here..." required />
    </form>
  );
}
