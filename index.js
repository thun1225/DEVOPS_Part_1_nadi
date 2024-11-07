<<<<<<< HEAD
const express = require('express')
const bodyParser = require('body-parser')
=======
>>>>>>> 225b68bf55e3511de5f3caa1dce463082398684b

var express = require('express');
var bodyParser = require("body-parser")
const { addTour, addTourValidation } = require("./utils/localToursUtils");

const app = express();
const PORT = process.env.PORT || 5050;
const startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

app.get("/", (req, res)=> {
  res.sendFile(__dirname + "/public/" + startPage);
});

app.post("/add-tour", addTourValidation, addTour);

const { createTrainTicketReservation } = require('./utils/TicketUtil')
app.post('/add-ticket-booking', createTrainTicketReservation);

const { addHotel, viewHotels } = require('./utils/HotelUtil')
app.post('/add-hotel', addHotel);
app.get('/view-hotels', viewHotels);

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/" + startPage);

});
server = app.listen(PORT, function() {
  const address = server.address();
  const baseUrl = `http://${address.address == "::"
    ? "localhost"
    : address.address}:${address.port}`;
  console.log(`Demo project at: ${baseUrl}`);
});
=======
server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;
    console.log(`Demo project at: ${baseUrl}`);
})

>>>>>>> 225b68bf55e3511de5f3caa1dce463082398684b
module.exports = { app, server };
