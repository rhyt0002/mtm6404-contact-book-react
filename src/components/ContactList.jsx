import React, { useState, useEffect } from "react";
import { db } from "../utils/db"; // Make sure this is the correct path for your Firebase config
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import './ContactList.css'; // Make sure to import the CSS

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        // Fetch contacts from Firestore
        const fetchContacts = async () => {
            const querySnapshot = await getDocs(collection(db, "contacts"));
            const contactsData = [];
            querySnapshot.forEach(doc => {
                contactsData.push({ id: doc.id, ...doc.data() });
            });

            // Sort contacts alphabetically by last name
            contactsData.sort((a, b) => {
                if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
                if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
                return 0;
            });

            setContacts(contactsData);
        };

        fetchContacts();
    }, []);

    return (
        <div className="contact-list">
            <h1>Contact List</h1>
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
                            <Link to={`/details/${contact.id}`}>
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
