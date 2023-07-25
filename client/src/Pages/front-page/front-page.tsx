import React from "react";
import "./front-page.scss";
import "../../styles/basics.scss";
import { ITeam, IDefi } from "../../types/types";
import { getTeams, getTeamById } from "../../services/equipe.service";
import {
  getDefis,
  remplirDefi,
  updatePointsEquipe,
  getDefisByEquipe,
} from "../../services/defi.service";

export default class FrontPage extends React.Component {
  async componentDidMount() {}
  render() {
    return (
      <div className="frontpage page">
        <div className="image">
          <img
            src={require("../../Assets/Images/photoFrontpage.jpg")}
            alt="caca"
          />
          <div className="cover">
            <div className="text">ENSC 2023 - 2024</div>
          </div>
        </div>

        <div className="content">
          <h1>FrontPage</h1>
        </div>
      </div>
    );
  }
}
