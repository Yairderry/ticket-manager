import "./App.css";
import { useState, useEffect } from "react";
import Tickets from "./components/Tickets";
import Header from "./components/Header";
import ErrorDisplay from "./components/ErrorDisplay";
import Loader from "./components/Loader";

const axios = require("axios").default;

function App() {
  const [tickets, setTickets] = useState([]);
  const [hiddenTickets, setHiddenTickets] = useState([]);
  const [restoreList, setRestore] = useState([]);
  const [error, setError] = useState({ error: false, message: "" });
  const [loader, setLoader] = useState(false);

  async function handleCommentSubmit(e, ticketId, commentId) {
    e.preventDefault();
    const form = e.target;

    setLoader(true);

    const formData = new FormData(form);

    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    form.reset();

    try {
      await axios.patch(
        `/api/tickets/${ticketId}/reply?commentId=${commentId}`,
        data
      );
      const searchInput = document.querySelector("#searchInput");
      await filterTickets(searchInput);
    } catch (err) {
      setLoader(false);
      setError({
        error: true,
        message: err.response.data.error,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    setLoader(true);
    form.parentElement.classList.add("hideForm");

    const formData = new FormData(form);

    const data = {};
    for (let [key, value] of formData.entries()) {
      if (key === "labels") {
        data[key] = data[key] ? data[key].concat(value) : [value];
      } else {
        data[key] = value;
      }
    }

    try {
      await axios.post("/api/tickets/new-ticket", data);
      const searchInput = document.querySelector("#searchInput");
      await filterTickets(searchInput);
    } catch (err) {
      setLoader(false);
      setError({
        error: true,
        message: err.response.data.error,
      });
    }
  }

  function showNotHiddenTickets(updatedTicketsList, hiddenTicketsList) {
    const filteredList = updatedTicketsList.filter(
      ({ id }) => !hiddenTicketsList.includes(id)
    );

    setTickets(filteredList);
    setLoader(false);
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

  function filterTickets(target) {
    setLoader(true);
    axios
      .get(`/api/tickets?searchText=${target.value}`)
      .then(({ data }) => {
        setRestore(data);
        showNotHiddenTickets(data, hiddenTickets);
      })
      .catch(() => {
        setLoader(false);
        setError({
          error: true,
          message: "There was an error in our servers, try again later",
        });
      });
  }

  // get all tickets when component mounted
  useEffect(() => {
    setLoader(true);
    axios
      .get("/api/tickets")
      .then(({ data }) => {
        setLoader(false);
        setRestore(data);
        setTickets(data);
      })
      .catch(() => {
        setLoader(false);
        setError({
          error: true,
          message: "There was an error in our servers, try again later",
        });
      });
  }, []);

  return (
    <div className="App">
      {loader && <Loader />}
      {error.error && (
        <ErrorDisplay setError={setError} message={error.message} />
      )}
      <Header
        filterTickets={filterTickets}
        restoreTicketsList={restoreTicketsList}
        hiddenTickets={hiddenTickets}
        handleSubmit={handleSubmit}
      />
      <Tickets
        tickets={tickets}
        hide={hide}
        handleCommentSubmit={handleCommentSubmit}
      />
    </div>
  );
}

export default App;
