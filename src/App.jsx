import { useState, useEffect } from 'react';
import { db } from './utils/db';
import { collection, getDocs } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import ViewContact from "./pages/ViewContact";
import Navbar from "./components/Navbar";


import './App.css'


const Contactcard = ({ id, firstName, lastName, email }) => {
  return (
    <div className="contact-card">
      <h2>{`${firstName} ${lastName}`}</h2>
      <p>Email: {email}</p>
    </div>
  )
}
function App() {
  const [Contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const docsSnapshot = await getDocs(collection(db, "Contacts"));
    const data = docsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  })
  console.log(Contacts);
  return (
    <>
    {Contacts.map((contact) => (
      <Contactcard
      key={contact.id}
      id={contact.id}
      firstName={contact.firstName}
      lastName={contact.lastName}
      email={contact.email}
    />
    ))}
      </>
  )

}

export default App;
