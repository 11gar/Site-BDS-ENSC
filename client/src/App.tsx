import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FrontPage from "./Pages/front-page/front-page";
import PreweiPage from "./Pages/prewei-page/prewei-page";
import { Routes, Route } from "react-router-dom";
import UserPage from "./Pages/user-page/user-page";
import Navbar from "./Components/Navbar/navbar";
import DefisPage from "./Pages/defis-page/defis-page";
import "./styles/variables.scss";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/profil" element={<UserPage />} />
        <Route path="/prewei/:defi" element={<PreweiPage />} />
        <Route path="/prewei/" element={<PreweiPage />} />
        <Route path="/defis/" element={<DefisPage />} />
      </Routes>
    </div>
  );
}

export default App;
