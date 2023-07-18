import React from "react";
import "../../styles/basics.scss";
import "./navbar.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/profil">Profil</Link>
      <Link to="/prewei">Pré-wei</Link>
    </nav>
  );
}
