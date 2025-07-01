"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.updatePerson = exports.getPersonById = exports.getAllPersons = exports.createPerson = void 0;
const person_model_1 = __importDefault(require("../models/person.model"));
const logger_1 = __importDefault(require("../logger/logger"));
const createPerson = async (req, res) => {
    try {
        const person = new person_model_1.default(req.body);
        await person.save();
        logger_1.default.info("user created successfully");
        res.status(201).json(person);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
};
exports.createPerson = createPerson;
const getAllPersons = async (_req, res) => {
    try {
        const persons = await person_model_1.default.find();
        res.json(persons);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.getAllPersons = getAllPersons;
const getPersonById = async (req, res) => {
    try {
        const person = await person_model_1.default.findById(req.params.id);
        if (!person)
            return res.status(404).json({ message: "Person not found" });
        res.json(person);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.getPersonById = getPersonById;
const updatePerson = async (req, res) => {
    try {
        const person = await person_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!person)
            return res.status(404).json({ message: "Person not found" });
        logger_1.default.info("user updated successfully");
        res.json(person);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
};
exports.updatePerson = updatePerson;
const deletePerson = async (req, res) => {
    try {
        const person = await person_model_1.default.findByIdAndDelete(req.params.id);
        if (!person)
            return res.status(404).json({ message: "Person not found" });
        logger_1.default.info("user Deleted successfully");
        res.json({ message: "Deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.deletePerson = deletePerson;
