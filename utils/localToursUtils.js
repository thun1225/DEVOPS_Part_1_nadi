const { Tour } = require("../models/localToursModel");
const fs = require("fs").promises;
const {
  check,
  validationResult
} = require("express-validator");

const readJSONData = async filename => {
  try {
    const data = await fs.readFile(filename, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    throw err;
  }
};

const writeJSONData = async (object, filename) => {
  try {
    const allObjects = await readJSONData(filename);
    allObjects.push(object);
    await fs.writeFile(filename, JSON.stringify(allObjects, null, 2), "utf8");
    return allObjects;
  } catch (err) {
    console.error("Error writing to JSON file:", err);
    throw err;
  }
};

const emailAddressRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\+?(\d{1,3})?[-. (]?(\d{1,4})[-. )]?(\d{1,4})[-. ]?(\d{1,9})$/;

// Validation rules for addTour
const addTourValidation = [
  check("host").trim().notEmpty().withMessage("Host is required."),

  check("officeLocation").trim().notEmpty().withMessage("Office Location is required."),

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

  check("emailAddress")
    .trim()
    .isEmail()
    .withMessage("Valid email Address is required.")
    .matches(emailAddressRegex),

  check("price").trim().isNumeric().withMessage("Price must be a number.")
];

const addTour = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      host,
      officeLocation,
      packageName,
      category,
      duration,
      phone,
      emailAddress,
      price
    } = req.body;

    const newTour = new Tour(
      host,
      officeLocation,
      packageName,
      category,
      duration,
      phone,
      emailAddress,
      price
    );

    const result = await writeJSONData(newTour, "utils/tours.json");
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error adding tour:", error);
    return res
      .status(500)
      .json({ message: "Error adding tour", error: String(error) });
  }
};

const viewTour = async (req, res) => {
  try {
    const allTour = await readJSONData("utils/tours.json");
    return res.status(201).json(allTour);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { readJSONData, writeJSONData, addTourValidation, addTour, viewTour };
