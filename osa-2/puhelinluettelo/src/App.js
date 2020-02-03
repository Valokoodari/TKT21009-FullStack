import React, { useState, useEffect } from "react";
import contactService from "./services/Contacts.js";

import ContactForm from "./components/ContactForm.js";
import Contacts from "./components/Contacts.js";
import Search from "./components/Search.js";

const Notification = ({notification}) => {
    if (notification.message === null) {
        return null;
    }

    if (notification.type === "Error") {
        return (
            <div className="error">
                {notification.message}
            </div>
        )
    }

    return (
        <div className="success">
            {notification.message}
        </div>
    )
}

const App = () => {
    const [ contacts, setContacts] = useState([]);
    const [ newName, setNewName ] = useState("");
    const [ newNumber, setNewNumber ] = useState("");
    const [ searchText, setSearchText ] = useState("");
    const [ notification, setNotification ] = useState({ message: null, type: null});

    useEffect(() => {
        contactService.getAll()
            .then(response => setContacts(response.data));
    }, []);

    return (
        <div>
            <h1 style={{marginTop: -5}}>Phonebook</h1>
            <Notification notification={notification} />

            <Search text={searchText} setText={setSearchText}/>

            <h2>Add a new contact</h2>
            <ContactForm
                name={newName}
                number={newNumber}
                contacts={contacts}
                setName={setNewName}
                setNumber={setNewNumber}
                setContacts={setContacts}
                setNotification={setNotification}
                contactService={contactService}
            />

            <h2>Contacts</h2>
            <Contacts
                contacts={contacts}
                search={searchText}
                contactService={contactService}
                setContacts={setContacts}
                setNotification={setNotification}
            />
        </div>
    )
}

export default App;