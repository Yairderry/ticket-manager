import React from "react";
import "../styles/SearchArea.css";

export default function SearchArea({ filterTickets }) {
  const labels = [
    "Help",
    "Tech",
    "Guidelines",
    "Corvid",
    "Api",
    "Collapse",
    "Expand",
    "Problem",
    "Login",
    "Tutorial",
    "View Count",
  ];
  return (
    <div className="searchArea">
      <input
        id="searchInput"
        name="SearchText"
        placeholder="Filter tickets"
        onChange={(e) => filterTickets(e.target)}
      />
      <div className="dropdown">
        <span className="dropBtn">Filter By Labels</span>
        <div className="dropdown-content">
          {labels.map((label, i) => (
            <span className="labelFilter" key={i} value={label}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
