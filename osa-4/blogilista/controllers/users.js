const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res) => {
    const users = await User
        .find({})
        .populate("blogs", {url: 1, title: 1, author: 1});
    
        res.json(users);
});

usersRouter.post("/", async (req, res) => {
    if (!req.body.password || req.body.password.length <= 3) {
        return res.status(400).send({error: "password has to be at least 3 characters long"});
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        username: req.body.username,
        name: req.body.name,
        passwordHash,
        blogs: []
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch(exception) {
        res.status(400).json(exception.message);
    }
});

module.exports = usersRouter;