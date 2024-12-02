import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../utils/db"; 
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import './ContactForm.css';
import "./ContactForm.css";
const ContactForm = ({ isEdit = false, fetchContacts }) => {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (isEdit && id) {
            const fetchContact = async () => {
                const docRef = doc(db, "contacts", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData({ id: docSnap.id, ...docSnap.data() });
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
                await updateDoc(doc(db, "contacts", id), formData);
            } else {
                await setDoc(doc(db, "contacts", new Date().getTime().toString()), formData);
            }
            fetchContacts(); // Refresh the contact list
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
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <button type="submit">{isEdit ? "Update" : "Add"} Contact</button>
        </form>
    );
};

export default ContactForm;