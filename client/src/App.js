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
  const [filters, setFilters] = useState([]);

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

    form.reset();

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

  function showNotHiddenTickets(
    updatedTicketsList,
    hiddenTicketsList,
    filters
  ) {
    const filteredList = updatedTicketsList.filter(
      ({ id }) => !hiddenTicketsList.includes(id)
    );

    if (filters.length > 0) {
      const newFilteredList = filteredList.filter(({ labels }) => {
        if (labels.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            if (filters.includes(labels[i])) return true;
          }
        }
      });

      setTickets(newFilteredList);
      setLoader(false);
      return;
    }

    setTickets(filteredList);
    setLoader(false);
  }

  function hide(id) {
    const newHiddenTickets = hiddenTickets.concat(id);

    showNotHiddenTickets(tickets, newHiddenTickets, filters);
    setHiddenTickets(newHiddenTickets);
  }

  function restoreTicketsList() {
    let filteredList = restoreList;

    if (filters.length > 0) {
      filteredList = restoreList.filter(({ labels }) => {
        if (labels.length > 0) {
          for (let i = 0; i < labels.length; i++) {
            if (filters.includes(labels[i])) return true;
          }
        }
      });
    }

    setTickets(filteredList);
    setHiddenTickets([]);
  }

  function addFilter(e) {
    const filter = e.target;
    const label = filter.textContent;

    filter.classList.toggle("checked");
    const newFilters = filters.includes(label)
      ? filters.filter((aLabel) => aLabel !== label)
      : filters.concat(label);

    setFilters(newFilters);
    showNotHiddenTickets(restoreList, hiddenTickets, newFilters);
  }

  function filterTickets(target) {
    setLoader(true);
    axios
      .get(`/api/tickets?searchText=${target.value}`)
      .then(({ data }) => {
        setRestore(data);
        showNotHiddenTickets(data, hiddenTickets, filters);
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
        addFilter={addFilter}
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
