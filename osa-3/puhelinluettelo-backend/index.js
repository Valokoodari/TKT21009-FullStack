const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Contact = require("./models/contact");

const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(morgan((tokens,req,res) => {
    let log = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"), "-",
        tokens["response-time"](req, res), "ms"
    ];

    if (tokens.method(req, res) == "POST") {
        log = log.concat(JSON.stringify(req.body));
    }

    return log.join(" ");
}));

app.get("/info", (req, res) => {
    Contact.find({}).then(contacts => res.send(
        `<p>The phonebook has info for ${contacts.length} people.</p>
        <p>${new Date()}</p>`
    ));
});

app.get("/api/persons", (req, res) => {
    Contact.find({}).then(contacts => res.json(contacts));
});

app.post("/api/persons", (req, res, next) => {
    const contact = new Contact({
        name: req.body.name,
        number: req.body.number
    });
    
    contact.save()
        .then(() => {
            console.log(`Added ${contact.name} ${contact.number} to the database.`);
            res.json(contact);
        }).catch(error => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
    Contact.findById(req.params.id)
        .then(contact => contact ? res.json(contact) : res.status(404).end())
        .catch(error => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
    const contact = {
        name: req.body.name,
        number: req.body.number
    };

    Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
        .then(contact => res.json(contact))
        .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error));
});

const errorHandler = (error, req, res, next) => {
    console.log(error.message);

    if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).send({ error: "malformed id" });
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});