import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components";
import { Header, About, Experience, Projects, Contacts } from "./containers";
import QAPage from "./pages/QAPage";
import AdminPage from "./pages/AdminPage";

// Main Portfolio view
function MainPortfolio() {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <About />
      <Experience />
      <Projects />
      <Contacts />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
