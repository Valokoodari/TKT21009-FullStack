import React from "react";

const ContactForm = ({name, number, contacts, setName, setNumber, setContacts, setNotification, contactService}) => {
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    }

    const addContact = (event) => {
        event.preventDefault();

        const contactObject = {
            name: name,
            number: number
        };

        if (contacts.some(contact => name === contact.name)) {
            const contact = contacts.find(c => c.name === name);
            if (window.confirm(`Update the number of ${name}`)) {
                contactService.update(contact.id, contactObject)
                    .then(response => {
                        setContacts(contacts.map(c => c.id !== contact.id ? c : response.data));
                        setNotification({message: `Updated ${contactObject.name}`, type: "Success"});
                        setTimeout(() => setNotification({message: null, type: null}), 5000);
                    })
                    .catch(error => {
                        setNotification({message: `Cannot update ${contactObject.name}`, type: "Error"});
                        setTimeout(() => setNotification({message: null, type: null}), 5000);
                    });
            }
        } else {
            contactService.create(contactObject)
                .then(response => {
                    setContacts(contacts.concat(response.data));
                    setNotification({message: `Added ${contactObject.name}`, type: "Success"});
                    setTimeout(() => setNotification({message: null, type: null}), 5000);
                })
                .catch(error => {
                    setNotification({message: `Cannot add ${contactObject.name}`, type: "Error"});
                    setTimeout(() => setNotification({message: null, type: null}), 5000);
                });
        }

        setName("");
        setNumber("");
    }

    return (
        <form onSubmit={addContact}>
            <div style={{marginTop: -15}}>
                Name
                <input style={{marginLeft: 19}}
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div style={{marginTop: 5}}>
                Number
                <input style={{marginLeft: 5}}
                    value={number}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit" style={{marginTop: 5}}>Add</button>
            </div>
        </form>
    )
}

export default ContactForm;