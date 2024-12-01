import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import ViewContact from "./pages/ViewContact";
import Navbar from "./components/Navbar";
import './App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddContact />} />
                <Route path="/edit/:id" element={<EditContact />} />
                <Route path="/view/:id" element={<ViewContact />} />
            </Routes>
        </Router>
    );
};

export default App;
