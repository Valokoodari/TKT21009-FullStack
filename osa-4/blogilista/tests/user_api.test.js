const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./user_test_helper");

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    for (let user of helper.listWithTwoUsers) {
        let userObject = new User(user);
        await userObject.save();
    }
});

describe("server response", () => {
    test("response has two users", async () => {
        const response = await api.get("/api/users");
        expect(response.body.length).toBe(2);
    });
});

describe("adding valid users", () => {
    test("a new user is added", async () => {
        const newUser = await api
            .post("/api/users")
            .send(helper.user);
        const response = await api.get("/api/users");

        expect(response.body.length).toBe(3);
        expect(response.body[2]).toEqual(newUser.body);
    });
});

describe("adding invalid users", () => {
    test("user without an username is not added", async () => {
        await api
            .post("/api/users")
            .send(helper.userWithoutUsername)
            .expect(400);
    });

    test("user with 2 char password is not added", async () => {
        await api
            .post("/api/users")
            .send(helper.userWithShortUsername)
            .expect(400);
    });

    test("user without a password is not added", async () => {
        await api
            .post("/api/users")
            .send(helper.userWithoutPassword)
            .expect(400);
    });

    test("user with 2 char password is not added", async () => {
        await api
            .post("/api/users")
            .send(helper.userWithShortPassword)
            .expect(400);
    });
});

describe("login", () => {
    test("correct login returns a token", async () => {
        const response = await api
            .post("/api/login")
            .send(helper.validLogin)
            .expect(200);

        expect(response.body.token).toBeDefined();
    });

    test("can't login with incorrect password", async () => {
        await api
            .post("/api/login")
            .send(helper.invalidLogin)
            .expect(401);
    });
});

afterAll(() => {
    mongoose.connection.close();
});