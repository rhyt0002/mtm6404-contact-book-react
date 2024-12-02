import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../utils/db";  // Assuming db.js has Firebase initialization
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import './ContactForm.css';

const ContactForm = ({ isEdit = false, contactData = {} }) => {
    const [formData, setFormData] = useState(contactData);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch existing contact data if it's an edit
    useEffect(() => {
        if (isEdit && id) {
            const fetchContact = async () => {
                try {
                    const docRef = doc(db, "contacts", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setFormData({ id: docSnap.id, ...docSnap.data() });
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching document: ", error);
                }
            };
            fetchContact();
        }
    }, [isEdit, id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (isEdit && id) {
                // Update existing contact
                await updateDoc(doc(db, "contacts", id), formData);
            } else {
                // Add new contact (using a new ID)
                await setDoc(doc(db, "contacts", new Date().getTime().toString()), formData);
            }
            navigate("/"); // Redirect to the contact list page after submitting
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName || ""}
                onChange={handleChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName || ""}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
            />
            <button type="submit">{isEdit ? "Update" : "Add"} Contact</button>
        </form>
    );
};

export default ContactForm;
