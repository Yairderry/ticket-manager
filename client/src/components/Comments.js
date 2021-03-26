import React from "react";
import Comment from "./Comment.js";

import "../styles/Comments.css";
import Reply from "./Reply.js";

export default function Comments({ comments, ticketId, handleCommentSubmit }) {
  return (
    <div className="comments hide">
      {comments && comments.length > 0 ? (
        comments.map(({ content, comments, userEmail, id }, i) => (
          <Comment
            key={i}
            content={content}
            comments={comments}
            userEmail={userEmail}
            commentId={id}
            ticketId={ticketId}
            handleCommentSubmit={handleCommentSubmit}
          />
        ))
      ) : (
        <div>There are no comments, be the first to comment!</div>
      )}
      <Reply handleCommentSubmit={handleCommentSubmit} ticketId={ticketId} />
    </div>
  );
}
