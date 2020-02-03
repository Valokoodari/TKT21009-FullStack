import React from 'react';

const Contacts = ({contacts, search, contactService, setContacts, setNotification}) => {
    const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {filtered.map(contact =>
                <Contact key={contact.id} contact={contact} contactService={contactService} contacts={contacts} setContacts={setContacts} setNotification={setNotification} />
            )}
        </div>
    )
}

const Contact = ({contact, contactService, contacts, setContacts, setNotification}) => (
    <div>
        &#8226; {contact.name} - {contact.number}
        <button
            onClick={() => {
                if (window.confirm(`Delete ${contact.name}?`)) {
                    contactService.erase(contact.id)
                        .then(() => {
                            setContacts(contacts.filter(cContact => cContact.id !== contact.id));
                            setNotification({message: `Deleted ${contact.name}`, type: "Success"});
                            setTimeout(() => setNotification({message: null, type: null}), 5000);
                        })
                        .catch(error => {
                            setNotification({message: `Cannot delete ${contact.name}`, type: "Error"});
                            setTimeout(() => setNotification({message: null, type: null}), 5000);
                        });

                }
            }} 
            style={{marginLeft: 4, height: 15, width: 34, fontSize: 10}}>
            <p style={{marginLeft: -4, marginTop: -1}}>delete</p>
        </button>
    </div>
)

export default Contacts;