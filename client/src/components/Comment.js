import React from "react";
import Reply from "./Reply";

export default function Comment({
  comments,
  content,
  userEmail,
  ticketId,
  commentId,
  handleCommentSubmit,
}) {
  return (
    <div className="comment">
      <p>
        <b>{userEmail}</b>
      </p>
      <p>{content}</p>
      <Reply
        handleCommentSubmit={handleCommentSubmit}
        ticketId={ticketId}
        commentId={commentId}
      />
      {comments &&
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
        ))}
    </div>
  );
}
