"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const person_model_1 = __importDefault(require("../src/models/person.model"));
describe("Person API", () => {
    it("should create a new person", async () => {
        const res = await (0, supertest_1.default)(app_1.default).post("/api/persons").send({
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
        await person_model_1.default.create({
            name: "Alice",
            city: "NYC",
            age: 30,
            number: "1112223333",
        });
        const res = await (0, supertest_1.default)(app_1.default).get("/api/persons");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
