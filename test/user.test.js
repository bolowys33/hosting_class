require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
  await mongoose.disconnect();
});

describe("POST /api/users/login", () => {
  it("should return successful login", async () => {
    const loginData = {
      email: "example2@email.com",
      password: "Bolodeoku1234@",
    };

    const res = await request(app).post("/api/users/login").send(loginData);

    expect(res.body.success).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Logged in successfully");
  });
});
