const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog
        .find({})
        .populate("user", { username: 1, name: 1 });

    res.json(blogs);
});
  
blogsRouter.post("/", async (req, res) => {
    if (!req.body.title)
        return res.status(400).send({ error: "blog title is required" });
    if (!req.body.url)
        return res.status(400).send({ error: "blog url is required" });
    
    let decodedToken = null;
    try {
        decodedToken = jwt.verify(req.token, config.SECRET);
    } catch {
        return res.status(401).send({ error: "missing or invalid token" });
    }
    if (!req.token || !decodedToken.id)
        return res.status(401).send({ error: "missing or invalid token" });
    
        const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes || 0,
        user: user.id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
    if (!req.token)
        return res.status(401).send({ error: "missing or invalid token" });

    let decodedToken = null;
    try {
        decodedToken = jwt.verify(req.token, config.SECRET);
    } catch {
        return res.status(401).send({ error: "missing or invalid token" });
    }
    if (!req.token || !decodedToken.id)
        return res.status(401).send({ error: "missing or invalid token" });

    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(req.params.id);

    if (blog.user.toString() !== user.id.toString())
        return res.status(401).send({ error: "you don't have the permission to delete this blog" });

    await Blog.findByIdAndRemove(req.params.id);

    res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBlog);
});

module.exports = blogsRouter;