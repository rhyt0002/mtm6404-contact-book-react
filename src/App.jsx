import { useState, useEffect } from 'react';
import { db } from './utils/db';
import { collection, getDocs } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import ViewContact from "./pages/ViewContact";
import Navbar from "./components/Navbar";

import './App.css';

function App() {
  const [Contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchContacts = async () => {
    const docsSnapshot = await getDocs(collection(db, "Contacts"));
    const data = docsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setContacts(data.sort((a, b) => a.lastName.localeCompare(b.lastName)));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = Contacts.filter(contact =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  
  return (
    <Router>
      <Navbar setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home contacts={filteredContacts} />} />
        <Route path="/add" element={<AddContact fetchContacts={fetchContacts} />} />
        <Route path="/edit/:id" element={<EditContact fetchContacts={fetchContacts} />} />
        <Route path="/view/:id" element={<ViewContact />} />
      </Routes>
    </Router>
  );
}

export default App;