import { Request, Response } from "express";
import Person from "../models/person.model";
import logger from "../logger/logger";

export const createPerson = async (req: Request, res: Response) => {
  try {
    const person = new Person(req.body);
    await person.save();
    logger.info("user created successfully");
    res.status(201).json(person);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getAllPersons = async (_req: Request, res: Response) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getPersonById = async (req: Request, res: Response) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ message: "Person not found" });
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!person) return res.status(404).json({ message: "Person not found" });
    logger.info("user updated successfully");
    res.json(person);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const deletePerson = async (req: Request, res: Response) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) return res.status(404).json({ message: "Person not found" });
    logger.info("user Deleted successfully");
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
