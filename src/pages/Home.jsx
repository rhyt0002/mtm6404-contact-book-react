import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../utils/db";

const Home = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            const querySnapshot = await getDocs(collection(db, "contacts"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setContacts(data.sort((a, b) => a.lastName.localeCompare(b.lastName)));
        };

        fetchContacts();
    }, []);

    const filteredContacts = contacts.filter(contact =>
        `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <ul>
                {filteredContacts.map(contact => (
                    <li key={contact.id}>
                        <Link to={`/view/${contact.id}`}>{contact.firstName} {contact.lastName}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/add">Add Contact</Link>
        </div>
    );
};

export default Home;
