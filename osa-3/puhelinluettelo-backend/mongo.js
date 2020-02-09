const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("ERROR: Missing database password!");
    process.exit();
}

const dbUrl = `mongodb+srv://puhelinluettelo:${process.argv[2]}@puhelinluettelo-database-diikr.mongodb.net/contacts-app?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length == 5) {
    const contact = new Contact({
        name: `${process.argv[3]}`,
        number: `${process.argv[4]}`
    });

    contact.save().then(() => {
        console.log(`Added ${contact.name} ${contact.number} to the database.`);
        mongoose.connection.close();
    });
} else if (process.argv.length == 3) {
    console.log("phonebook:");
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact.name, contact.number);
        });
        mongoose.connection.close();
    });
} else {
    console.log("ERROR: Invalid number of arguments!");
}