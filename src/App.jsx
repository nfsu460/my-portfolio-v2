import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components";
import { Header, About, Experience, Projects, Contacts } from "./containers";
import QAPage from "./pages/QAPage";
import AdminPage from "./pages/AdminPage";
import { seedDatabase } from "./utils/dbSeeder";

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
  useEffect(() => {
    // Automatically seed the database if it is empty
    seedDatabase().catch((err) => {
      console.warn("Auto-seeding database skipped or offline:", err);
    });
  }, []);

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
