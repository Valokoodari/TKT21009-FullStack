const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./blog_test_helper");
const uhelper = require("./user_test_helper");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    let userObject = new User(uhelper.listWithTwoUsers[0]);
    await userObject.save();

    for (let blog of helper.listWithSixBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});

describe("server response", () => {
    test("response has the correct length", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body.length).toBe(6);
    });

    test("first blog has the key 'id'", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body[0].id).toBeDefined();
    });
});

describe("adding valid blogs", () => {
    test("new blog is added correctly", async () => {
        const loginResponse = await api.post("/api/login").send(uhelper.validLogin);
        const token = "Bearer " + loginResponse.body.token;

        await api
            .post("/api/blogs")
            .set("Authorization", token)
            .send(helper.blog)
            .expect(201);
    });

    test("new blog with undefined likes gets 0 likes", async () => {
        const loginResponse = await api.post("/api/login").send(uhelper.validLogin);
        const token = "Bearer " + loginResponse.body.token;

        await api
            .post("/api/blogs")
            .set("Authorization", token)
            .send(helper.blogWithoutLikes)
            .expect(201);

        const response = await api.get("/api/blogs");
        expect(response.body[6].likes).toBe(0);
    });
});

describe("adding invalid blogs", () => {
    test("a blog with no title is not saved", async () => {
        const loginResponse = await api.post("/api/login").send(uhelper.validLogin);
        const token = "Bearer " + loginResponse.body.token;

        await api
            .post("/api/blogs")
            .set("Authorization", token)
            .send(helper.blogWithoutTitle)
            .expect(400);
    });

    test("a blog with no url is not saved", async () => {
        const loginResponse = await api.post("/api/login").send(uhelper.validLogin);
        const token = "Bearer " + loginResponse.body.token;

        await api
            .post("/api/blogs")
            .set("Authorization", token)
            .send(helper.blogWithoutUrl)
            .expect(400);
    });

    test("a blog cannot be added without authorization", async () => {
        await api
            .post("/api/blogs")
            .send(helper.blog)
            .expect(401);
    });
});

describe("deleting blogs", () => {
    test("a blog is deleted", async () => {
        const loginResponse = await api.post("/api/login").send(uhelper.validLogin);
        const token = "Bearer " + loginResponse.body.token;

        await api
            .delete(`/api/blogs/${helper.listWithSixBlogs[0]._id}`)
            .set("Authorization", token)
            .expect(204);

        const response = await api.get("/api/blogs");
        expect(response.body.length).toBe(5);
    });
});

describe("updating blogs", () => {
    test("likes are updated correctly", async () => {
        const response = await api
            .put(`/api/blogs/${helper.updatedBlog._id}`)
            .send(helper.updatedBlog)
            .expect(200);

        expect(response.body.likes).toBe(22);
    })
})

afterAll(() => {
    mongoose.connection.close();
});