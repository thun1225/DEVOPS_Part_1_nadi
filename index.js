"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var localToursUtils_1 = require("./utils/localToursUtils");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5050;
var startPage = "index.html";
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static("./public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/" + startPage);
});
app.post("/add-tour", localToursUtils_1.addTourValidation, localToursUtils_1.addTour);
var server = app.listen(PORT, function () {
    var address = server.address();
    if (!address) {
        console.log("Server address is not available.");
        return;
    }
    var baseUrl;
    if (typeof address === "string") {
        baseUrl = "http://".concat(address);
    }
    else {
        var hostname = address.address === "::" ? "localhost" : address.address;
        baseUrl = "http://".concat(hostname, ":").concat(address.port);
    }
    console.log("Demo project at: ".concat(baseUrl));
});
module.exports = { app: app, server: server };
