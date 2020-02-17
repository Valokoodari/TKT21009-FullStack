const listHelper = require("../utils/list_helper");
const helper = require("./blog_test_helper");

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe("total likes", () => {
    test("correct result with one blog", () => {
        const result = listHelper.totalLikes(helper.listWithOneBlog);
        expect(result).toBe(5);
    });

    test("correct result with multiple blogs", () => {
        const result = listHelper.totalLikes(helper.listWithSixBlogs);
        expect(result).toBe(36);
    });
});

describe("favorite blog", () => {
    test("correct result with one blog", () => {
        const result = listHelper.favoriteBlog(helper.listWithOneBlog);
        expect(result).toEqual(helper.listWithOneBlog[0]);
    });

    test("correct result with multiple blogs", () => {
        const result = listHelper.favoriteBlog(helper.listWithSixBlogs);
        expect(result).toEqual(helper.listWithSixBlogs[2]);
    });
});

describe("most blogs", () => {
    test("correct result with one blog", () => {
        const result = listHelper.mostBlogs(helper.listWithOneBlog);
        expect(result).toBe("Edsger W. Dijkstra");
    });

    test("correct result with multiple blogs", () => {
        const result = listHelper.mostBlogs(helper.listWithSixBlogs);
        expect(result).toBe("Robert C. Martin");
    });
});

describe("most likes", () => {
    test("correct result with one blog", () => {
        const result = listHelper.mostLikes(helper.listWithOneBlog);
        expect(result).toEqual({"author": "Edsger W. Dijkstra", "likes": 5});
    });
    
    test("correct result with multiple blogs", () => {
        const result = listHelper.mostLikes(helper.listWithSixBlogs);
        expect(result).toEqual({"author": "Edsger W. Dijkstra", "likes": 17});
    });
})