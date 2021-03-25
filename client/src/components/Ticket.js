import React from "react";
import Content from "./Content";
import Info from "./Info";
import Comments from "./Comments";

import "../styles/Ticket.css";

export default function Ticket({
  title,
  comments,
  userEmail,
  content,
  creationTime,
  labels,
  id,
  hide,
  handleCommentSubmit,
}) {
  return (
    <div id={id} className="ticket">
      <Content title={title} content={content} />
      <Info labels={labels} userEmail={userEmail} creationTime={creationTime} />
      <div className="options">
        <button className="hideTicketButton" onClick={() => hide(id)}>
          hide
        </button>
      </div>
      <div className="buttons">
        <button className="showButton" onClick={showMore}>
          show
        </button>
        <button onClick={showComments}>💬 {comments && comments.length}</button>
      </div>
      <Comments
        comments={comments}
        ticketId={id}
        handleCommentSubmit={handleCommentSubmit}
      />
    </div>
  );
}

// helper function

function showMore(e) {
  const button = e.target;
  button.parentElement.parentElement
    .querySelector(".ticketContent")
    .classList.toggle("showMore");

  button.classList.toggle("showLess");
}

function showComments(e) {
  const button = e.target;
  button.parentElement.parentElement
    .querySelector(".comments")
    .classList.toggle("hide");
}
