const _ = require("underscore");

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((acc, cur) => {
        return acc + cur.likes;
    }, 0);
};

const favoriteBlog = (blogs) => {
    return blogs.reduce((acc, cur) => {
        return (acc.likes > cur.likes) ? acc : cur;
    }, blogs[0]);
};

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author).sort();
    return _.max(_.groupBy(authors), "length")[0];
};

const mostLikes = (blogs) => {
    const grouped = _.groupBy(blogs, "author");

    return likes = _.max(_.map(grouped, (list) => {
        return list.reduce((acc, cur) => {
            return { "author": acc.author, "likes": acc.likes + cur.likes};
        }, {author: list[0].author, "likes": 0});
    }), "likes");
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};