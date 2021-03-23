import React from "react";

export default function SearchArea({ filterTickets }) {
  return (
    <>
      <input
        id="searchInput"
        name="SearchText"
        placeholder="Filter tickets"
        onChange={filterTickets}
      />
    </>
  );
}
