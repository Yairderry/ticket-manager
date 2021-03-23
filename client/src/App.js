import "./App.css";
import { useState, useEffect } from "react";
import Tickets from "./components/Tickets";
import SearchArea from "./components/SearchArea";

const axios = require("axios").default;

function App() {
  const [tickets, setTickets] = useState([]);

  function filterTickets(e) {
    axios.get(`/api/tickets?searchText=${e.target.value}`).then(({ data }) => {
      setTickets(data);
    });
  }

  // get all tickets when component mounted
  useEffect(() => {
    axios.get("/api/tickets").then(({ data }) => {
      setTickets(data);
    });
  }, []);

  return (
    <div className="App">
      <SearchArea filterTickets={filterTickets} />
      <Tickets tickets={tickets} />
    </div>
  );
}

export default App;
