// UpdateContact.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/db';

const UpdateContact = ({ contacts }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchContact = async () => {
            const contactRef = doc(db, "contacts", id);
            const docSnap = await getDoc(contactRef);
            if (docSnap.exists()) {
                const contactData = docSnap.data();
                setFirstName(contactData.firstName);
                setLastName(contactData.lastName);
                setEmail(contactData.email);
            } else {
                console.error("No such document!");
            }
        };

        fetchContact();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedContact = { firstName, lastName, email };
        const contactRef = doc(db, "contacts", id);
        
        try {
            await updateDoc(contactRef, updatedContact);
            console.log("Document updated successfully");
            navigate(`/contact/${id}`);
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    return (
        <div>
            <h2>Update Contact</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Contact</button>
            </form>
        </div>
    );
};

export default UpdateContact;