# Ticket Manager

In this project i created a Ticket Manager Web Application, with the [MERN stack](https://www.educative.io/edpresso/what-is-mern-stack)

Link to the heroku app [here](https://ticket-manager-yair.herokuapp.com/)

## Backend

- The server runs on port `8080` serve the react app and expose those API endpoints:
  - [GET] `api/tickets` - returns an array of all tickets in the collection `tickets` in my mongoDB atlas database. If called with query param `searchText` the API will filter only tickets that have a title including a case-insensitive version of the `searchText` param
  - [POST] `api/tickets/new-ticket` - adds a new ticket to the mongoDB atlas database with the given data from the request body. If any data is missing in the body it's either autofilled or throws an error
  - [PATCH] `api/tickets/[:ticketId]/done` - Sets `done` property to `true` for the given ticketId - should return `{updated: true}` if succeed
  - [PATCH] `api/tickets/[:ticketId]/undone` - Sets `done` property to `false` for the given ticketId - should return `{updated: true}` if succeed
  - [PATCH] `api/tickets/[:ticketId]/reply/undone` - Sets `comments` property to an updated comment section for the given ticketId - should return `{updated: true}` if succeed. If called with query param `commentId` the API will find the correct comment if it exists and add the new comment to it's comment section

## Client Features

- The app can filter the given tickets by a given title or a part of it
- The app can filter the given tickets by one label or more
- The app can add a new ticket to the mongoDB atlas database and render it to the page if it fits the current filters
- Tickets can be hidden and restored back to the page
- Each ticket has it's own comment section, you can add comments to the ticket itself or to any other comment in the comment section
- There's a 'scroll to the top of the page' button
- If a ticket is to long then there's a show more/show less option
