import express, { Application } from "express";
import bodyParser from "body-parser";
import { addTour, addTourValidation } from "./utils/localToursUtils";

const app: Application = express();
const PORT: string | number = process.env.PORT || 5050;
const startPage: string = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));
app.get("/", (req, res): void => {
  res.sendFile(__dirname + "/public/" + startPage);
});

app.post("/add-tour", addTourValidation, addTour);

const server = app.listen(PORT, (): void => {
  const address = server.address();

  if (!address) {
    console.log("Server address is not available.");
    return;
  }

  let baseUrl: string;

  if (typeof address === "string") {
    baseUrl = `http://${address}`;
  } else {
    const hostname = address.address === "::" ? "localhost" : address.address;
    baseUrl = `http://${hostname}:${address.port}`;
  }

  console.log(`Demo project at: ${baseUrl}`);
});

module.exports = { app, server };
