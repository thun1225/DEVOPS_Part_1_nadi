"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTour = exports.addTourValidation = exports.writeJSON = exports.readJSON = void 0;
const localToursModel_1 = require("../models/localToursModel");
const fs_1 = require("fs");
const express_validator_1 = require("express-validator");
const readJSON = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.promises.readFile(filename, "utf8");
        return JSON.parse(data);
    }
    catch (err) {
        console.error("Error reading JSON file:", err);
        throw err;
    }
});
exports.readJSON = readJSON;
const writeJSON = (object, filename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allObjects = yield (0, exports.readJSON)(filename);
        allObjects.push(object);
        yield fs_1.promises.writeFile(filename, JSON.stringify(allObjects, null, 2), "utf8");
        return allObjects;
    }
    catch (err) {
        console.error("Error writing to JSON file:", err);
        throw err;
    }
});
exports.writeJSON = writeJSON;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\+?(\d{1,3})?[-. (]?(\d{1,4})[-. )]?(\d{1,4})[-. ]?(\d{1,9})$/;
// Validation rules for addTour
exports.addTourValidation = [
    (0, express_validator_1.check)("host").trim().notEmpty().withMessage("Host is required."),
    (0, express_validator_1.check)("location").trim().notEmpty().withMessage("Location is required."),
    (0, express_validator_1.check)("packageName")
        .trim()
        .notEmpty()
        .withMessage("Package name is required."),
    (0, express_validator_1.check)("category").trim().notEmpty().withMessage("Category is required."),
    (0, express_validator_1.check)("duration").trim().notEmpty().withMessage("Duration is required."),
    (0, express_validator_1.check)("phone")
        .trim()
        .matches(mobileRegex)
        .withMessage("Valid phone number is required."),
    (0, express_validator_1.check)("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required.")
        .matches(emailRegex),
    (0, express_validator_1.check)("price").trim().isNumeric().withMessage("Price must be a number.")
];
const addTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check validation results
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { host, location, packageName, category, duration, phone, email, price } = req.body;
        const newTour = new localToursModel_1.Tour(host, location, packageName, category, duration, phone, email, price);
        const result = yield (0, exports.writeJSON)(newTour, "utils/tours.json");
        return res.status(201).json(result);
    }
    catch (error) {
        console.error("Error adding tour:", error);
        return res
            .status(500)
            .json({ message: "Error adding tour", error: String(error) });
    }
});
exports.addTour = addTour;
