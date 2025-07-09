const request = require("supertest");
const app = require("../app");
const db = require("../models");

describe("GET /user", () => {
  test("gets the user endpoint", async () => {
    await request(app)
      .get("/user")
      .query({ page: 1, size: 1 })
      .then((res) => expect(res.status).toBe(200));
  });
});

describe("POST /user", () => {
  test("creates new user ", async () => {
    await request(app)
      .post("/user")
      .send({
        fullName: "Test Bahadur",
        email: "test@gmail.com",
        password: "password123",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
