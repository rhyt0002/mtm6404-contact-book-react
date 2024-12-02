import React from "react";
import { Link } from "react-router-dom";
import './ContactList.css';

const ContactList = ({ contacts }) => {
  return (
    <div className="contact-list">
      {contacts.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        contacts.map(contact => (
          <div key={contact.id} className="contact-item">
            <span className="name">
              {contact.firstName} {contact.lastName}
            </span>
            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <button>Edit</button>
              </Link>
              <Link to={`/view/${contact.id}`}>
                <button>Details</button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactList;