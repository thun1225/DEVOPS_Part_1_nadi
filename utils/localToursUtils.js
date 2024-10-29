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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTour = exports.addTourValidation = exports.writeJSON = exports.readJSON = void 0;
var localToursModel_1 = require("../models/localToursModel");
var fs_1 = require("fs");
var express_validator_1 = require("express-validator");
var readJSON = function (filename) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs_1.promises.readFile(filename, "utf8")];
            case 1:
                data = _a.sent();
                return [2 /*return*/, JSON.parse(data)];
            case 2:
                err_1 = _a.sent();
                console.error("Error reading JSON file:", err_1);
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readJSON = readJSON;
var writeJSON = function (object, filename) { return __awaiter(void 0, void 0, void 0, function () {
    var allObjects, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, exports.readJSON)(filename)];
            case 1:
                allObjects = _a.sent();
                allObjects.push(object);
                return [4 /*yield*/, fs_1.promises.writeFile(filename, JSON.stringify(allObjects, null, 2), "utf8")];
            case 2:
                _a.sent();
                return [2 /*return*/, allObjects];
            case 3:
                err_2 = _a.sent();
                console.error("Error writing to JSON file:", err_2);
                throw err_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.writeJSON = writeJSON;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var mobileRegex = /^\+?(\d{1,3})?[-. (]?(\d{1,4})[-. )]?(\d{1,4})[-. ]?(\d{1,9})$/;
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
var addTour = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, host, location_1, packageName, category, duration, phone, email, price, newTour, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = req.body, host = _a.host, location_1 = _a.location, packageName = _a.packageName, category = _a.category, duration = _a.duration, phone = _a.phone, email = _a.email, price = _a.price;
                newTour = new localToursModel_1.Tour(host, location_1, packageName, category, duration, phone, email, price);
                return [4 /*yield*/, (0, exports.writeJSON)(newTour, "utils/tours.json")];
            case 2:
                result = _b.sent();
                return [2 /*return*/, res.status(201).json(result)];
            case 3:
                error_1 = _b.sent();
                console.error("Error adding tour:", error_1);
                return [2 /*return*/, res
                        .status(500)
                        .json({ message: "Error adding tour", error: String(error_1) })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addTour = addTour;
