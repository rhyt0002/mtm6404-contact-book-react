import React from "react";
import ContactForm from "../components/ContactForm"; // Ensure this path is correct

const AddContact = ({ fetchContacts }) => {
  return (
    <div>
      <h1>Add Contact</h1>
      <ContactForm fetchContacts={fetchContacts} />
    </div>
  );
};

export default AddContact;