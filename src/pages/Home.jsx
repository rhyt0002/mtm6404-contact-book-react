// Home.jsx
import React from "react";
import ContactList from "../components/ContactList"; // Ensure this path is correct
import { Link } from "react-router-dom";

const Home = ({ contacts }) => {
  return (
    <div>
      <h1>Contact List</h1>
      <ContactList contacts={contacts} />
      <Link to="/add">Add Contact</Link>
    </div>
  );
};

export default Home;