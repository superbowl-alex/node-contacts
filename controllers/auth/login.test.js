const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = require("./login");
const { User } = require("../../models/user");

jest.mock("../../models/user"); // Замокать Mongoose-модель

const app = express();
app.use(express.json());
app.post("/api/users/login", login);

describe("test login controller", () => {
  let server;

  beforeAll(() => {
    server = app.listen(4000);
  });

  afterAll(() => {
    server.close();
  });

  test("login return status 200", async () => {
    User.findOne.mockResolvedValue({
      _id: "12345",
      email: "pasha@gmail.com",
      password: bcrypt.hashSync("1111", 10),
      subscription: "starter",
    });

    User.findByIdAndUpdate.mockResolvedValue();

    const response = await request(app).post("/api/users/login").send({
      email: "pasha@gmail.com",
      password: "1111",
    });

    expect(response.status).toBe(200);
  });

  test("response body must have token and it`s typeof is String", async () => {
    User.findOne.mockResolvedValue({
      _id: "12345",
      email: "pasha@gmail.com",
      password: bcrypt.hashSync("1111", 10),
      subscription: "starter",
    });

    User.findByIdAndUpdate.mockResolvedValue();

    const response = await request(app).post("/api/users/login").send({
      email: "pasha@gmail.com",
      password: "1111",
    });

    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });

  test("response body must have user object with properties email and subscription", async () => {
    User.findOne.mockResolvedValue({
      _id: "12345",
      email: "pasha@gmail.com",
      password: bcrypt.hashSync("1111", 10),
      subscription: "starter",
    });

    User.findByIdAndUpdate.mockResolvedValue();

    const response = await request(app).post("/api/users/login").send({
      email: "pasha@gmail.com",
      password: "1111",
    });
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("email");
    expect(response.body.user).toHaveProperty("subscription");
  });

  test("typeof of properties email and subscription in user object in response body is String", async () => {
    User.findOne.mockResolvedValue({
      _id: "12345",
      email: "pasha@gmail.com",
      password: bcrypt.hashSync("1111", 10),
      subscription: "starter",
    });

    User.findByIdAndUpdate.mockResolvedValue();

    const response = await request(app).post("/api/users/login").send({
      email: "pasha@gmail.com",
      password: "1111",
    });
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
