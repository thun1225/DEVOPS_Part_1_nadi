
const express = require('express');
const bodyParser = require("body-parser")
const { addTour, addTourValidation, viewTour } = require("./utils/localToursUtils");
const cors = require('cors')
const app = express();
const PORT = 5050;
const startPage = "index.html";


const corsOptions = {
  origin: 'http://localhost:5050', // allow only this origin to access resources
  methods: ['POST'], // allowed HTTP methods
  allowedHeaders: ['Content-Type', 'application/json'], // allowed headers
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

app.get("/", (req, res)=> {
  res.sendFile(__dirname + "/public/" + startPage);
});

app.post("/add-tour", addTourValidation, addTour);
app.get('/view-tour', viewTour)

const { createTrainTicketReservation } = require('./utils/TicketUtil')
app.post('/add-ticket-booking', createTrainTicketReservation);

const { addHotel } = require('./utils/HotelUtil')
app.post('/add-hotel', addHotel);


const { viewHotels } = require('./utils/ViewHotelUtils')
app.get('/view-hotels', viewHotels);

server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;
    console.log(`Demo project at: ${baseUrl}`);
})

module.exports = { app, server };
