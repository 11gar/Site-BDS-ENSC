import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FrontPage from "./Pages/front-page/front-page";
import PreweiPage from "./Pages/prewei-page/prewei-page";
import { Routes, Route } from "react-router-dom";
import UserPage from "./Pages/user-page/user-page";
import Navbar from "./Components/Navbar/navbar";
import "./styles/variables.scss";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/profil/:id" element={<UserPage />} />
        <Route path="/prewei" element={<PreweiPage />} />
      </Routes>
    </div>
  );
}

export default App;
