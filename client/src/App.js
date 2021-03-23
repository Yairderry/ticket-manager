import "./App.css";
import { useState, useEffect } from "react";
import Tickets from "./components/Tickets";
import SearchArea from "./components/SearchArea";

const axios = require("axios").default;

function App() {
  const [tickets, setTickets] = useState([]);
  const [hiddenTickets, setHiddenTickets] = useState([]);
  const [restoreList, setRestore] = useState([]);

  function showNotHiddenTickets(updatedTicketsList, hiddenTicketsList) {
    const filteredList = updatedTicketsList.filter((ticket) => {
      return !JSON.stringify(hiddenTicketsList).includes(
        JSON.stringify(ticket)
      );
    });

    setTickets(filteredList);
  }

  function hide(ticket) {
    const newHiddenTickets = hiddenTickets.concat([ticket]);

    showNotHiddenTickets(tickets, newHiddenTickets);
    setHiddenTickets(newHiddenTickets);
  }

  function restore() {
    setTickets(restoreList);
    setHiddenTickets([]);
  }

  function filterTickets(e) {
    axios.get(`/api/tickets?searchText=${e.target.value}`).then(({ data }) => {
      setRestore(data);
      showNotHiddenTickets(data, hiddenTickets);
    });
  }

  // get all tickets when component mounted
  useEffect(() => {
    axios.get("/api/tickets").then(({ data }) => {
      setRestore(data);
      setTickets(data);
    });
  }, []);

  return (
    <div className="App">
      <SearchArea filterTickets={filterTickets} />
      <h2 id="hideTicketsCounter">{hiddenTickets.length}</h2>
      <button id="restoreHideTickets" onClick={restore}>
        restore
      </button>
      <Tickets tickets={tickets} hide={hide} />
    </div>
  );
}

export default App;
