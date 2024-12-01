import React, { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../db";
import { useParams, useHistory } from "react-router-dom";
import './ContactDetails.css';

const ContactDetails = () => {
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const docRef = doc(db, "contacts", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setContact({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching contact:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!contact) {
        return <div>Contact not found.</div>;
    }

    const handleDelete = async (id) => {
        try {
            const docRef = doc(db, "contacts", id);
            await deleteDoc(docRef);
            history.push("/contacts");  // Navigate to contact list after deletion
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div>
            <h2>Contact Details</h2>
            <p><strong>First Name:</strong> {contact.firstName}</p>
            <p><strong>Last Name:</strong> {contact.lastName}</p>
            <p><strong>Email:</strong> {contact.email}</p>

            <button onClick={() => history.push(`/edit/${contact.id}`)}>Edit</button>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
        </div>
    );
};

export default ContactDetails;
