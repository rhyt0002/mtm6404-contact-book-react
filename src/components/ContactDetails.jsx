import React from 'react';
import { useParams } from 'react-router-dom';

const ContactDetails = ({ Contacts }) => {
    const { id } = useParams();
    const contact = Contacts.find(c => c.id === parseInt(id));

    if (!contact) {
        return <div>Contact not found</div>;
    }

    return (
        <div>
            <h2>{contact.name}</h2>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default ContactDetails;