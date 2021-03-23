import "./App.css";
import { useState, useEffect } from "react";
import Tickets from "./components/Tickets";
import Header from "./components/Header";

const axios = require("axios").default;

function App() {
  const [tickets, setTickets] = useState([]);
  const [hiddenTickets, setHiddenTickets] = useState([]);
  const [restoreList, setRestore] = useState([]);

  function showNotHiddenTickets(updatedTicketsList, hiddenTicketsList) {
    const filteredList = updatedTicketsList.filter(
      ({ id }) => !hiddenTicketsList.includes(id)
    );

    setTickets(filteredList);
  }

  function hide(id) {
    const newHiddenTickets = hiddenTickets.concat(id);

    showNotHiddenTickets(tickets, newHiddenTickets);
    setHiddenTickets(newHiddenTickets);
  }

  function restoreTicketsList() {
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
      <Header
        filterTickets={filterTickets}
        restoreTicketsList={restoreTicketsList}
        hiddenTickets={hiddenTickets}
      />
      <Tickets tickets={tickets} hide={hide} />
    </div>
  );
}

export default App;
