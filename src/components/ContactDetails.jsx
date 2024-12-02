// ContactDetails.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ContactDetails = ({ contacts }) => {
    const { id } = useParams();
    const contact = contacts.find(c => c.id === parseInt(id));

    if (!contact) {
        return <div>Contact not found</div>;
    }

    return (
        <div>
            <h2>{contact.firstName} {contact.lastName}</h2>
            <p>Email: {contact.email}</p>
            <Link to={`/contact/update/${contact.id}`}>Update Contact</Link>
        </div>
    );
};

export default ContactDetails;