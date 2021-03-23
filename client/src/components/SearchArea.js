import React from "react";

export default function SearchArea({ filterTickets }) {
  return (
    <div>
      <input
        id="searchInput"
        name="SearchText"
        placeholder="Filter tickets"
        onChange={filterTickets}
      />
    </div>
  );
}
