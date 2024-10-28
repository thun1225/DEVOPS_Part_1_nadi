"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const localToursUtils_1 = require("./utils/localToursUtils");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5050;
const startPage = "index.html";
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static("./public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
});
app.post("/add-tour", localToursUtils_1.addTourValidation, localToursUtils_1.addTour);
const server = app.listen(PORT, () => {
    const address = server.address();
    if (!address) {
        console.log("Server address is not available.");
        return;
    }
    let baseUrl;
    if (typeof address === "string") {
        baseUrl = `http://${address}`;
    }
    else {
        const hostname = address.address === "::" ? "localhost" : address.address;
        baseUrl = `http://${hostname}:${address.port}`;
    }
    console.log(`Demo project at: ${baseUrl}`);
});
module.exports = { app, server };
