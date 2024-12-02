import React from "react";
import ContactForm from "../components/ContactForm"; // Ensure this path is correct

const EditContact = ({ fetchContacts }) => {
  return (
    <div>
      <h1>Edit Contact</h1>
      <ContactForm isEdit={true} fetchContacts={fetchContacts} />
    </div>
  );
};

export default EditContact;