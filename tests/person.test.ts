import request from "supertest";
import app from "../src/app";
import Person from "../src/models/person.model";

describe("Person API", () => {
  it("should create a new person", async () => {
    const res = await request(app).post("/api/persons").send({
      name: "Test User",
      city: "Test City",
      age: 25,
      number: "1234567890",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test User");
    expect(res.body.city).toBe("Test City");
  });

  it("should fetch all persons", async () => {
    await Person.create({
      name: "Alice",
      city: "NYC",
      age: 30,
      number: "1112223333",
    });

    const res = await request(app).get("/api/persons");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
