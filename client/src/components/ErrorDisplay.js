import React from "react";
import "../styles/Error.css";

export default function ErrorDisplay({ setError, message }) {
  return (
    <div className="error">
      <div>
        <p>{message}</p>
        <button onClick={() => setError(false)}>Go Back</button>
      </div>
    </div>
  );
}
