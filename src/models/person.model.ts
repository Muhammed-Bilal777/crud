import mongoose, { Schema, Document } from "mongoose";

export interface IPerson extends Document {
  name: string;
  city: string;
  age: number;
  number: string;
}

const PersonSchema: Schema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  age: { type: Number, required: true },
  number: { type: String, required: true },
});

export default mongoose.model<IPerson>("Person", PersonSchema);
