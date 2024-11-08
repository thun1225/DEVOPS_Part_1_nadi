const { Tour } = require("../models/localToursModel");
const fs = require('fs').promises;
//import { Request, Response } from "express";
const { check, ValidationChain, validationResult } = require("express-validator");

const readJSON = async filename => {
  try {
    const data = await fs.readFile(filename, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    throw err;
  }
};

const writeJSON = async (object, filename) => {
  try {
    const allObjects = await readJSON(filename);
    allObjects.push(object);
    await fs.writeFile(filename, JSON.stringify(allObjects, null, 2), "utf8");
    return allObjects;
  } catch (err) {
    console.error("Error writing to JSON file:", err);
    throw err;
  }
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\+?(\d{1,3})?[-. (]?(\d{1,4})[-. )]?(\d{1,4})[-. ]?(\d{1,9})$/;

// Validation rules for addTour
const addTourValidation = [
  check("host").trim().notEmpty().withMessage("Host is required."),

  check("location").trim().notEmpty().withMessage("Location is required."),

  check("packageName")
    .trim()
    .notEmpty()
    .withMessage("Package name is required."),

  check("category").trim().notEmpty().withMessage("Category is required."),

  check("duration").trim().notEmpty().withMessage("Duration is required."),

  check("phone")
    .trim()
    .matches(mobileRegex)
    .withMessage("Valid phone number is required."),

  check("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required.")
    .matches(emailRegex),

  check("price").trim().isNumeric().withMessage("Price must be a number."),
];

const addTour = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      host,
      location,
      packageName,
      category,
      duration,
      phone,
      email,
      price
    } = req.body;

    const newTour = new Tour(
      host,
      location,
      packageName,
      category,
      duration,
      phone,
      email,
      price
    );

    const result = await writeJSON(newTour, "utils/tours.json");
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error adding tour:", error);
    return res
      .status(500)
      .json({ message: "Error adding tour", error: String(error) });
  }
};

module.exports = { readJSON, writeJSON, addTourValidation, addTour};