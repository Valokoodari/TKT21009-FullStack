const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization");
    
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        req.token = authorization.substring(7);
    }

    next();
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" });
}

module.exports = {
    tokenExtractor,
    unknownEndpoint
}