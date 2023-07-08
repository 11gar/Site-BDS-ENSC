import React from "react";
import { Id } from "../../types/types";
import "./prewei-page.scss";
import "../../styles/basics.scss";
import { ITeam } from "../../types/types";
import { getTeams } from "../../services/equipe.service";

export default class PreweiPage extends React.Component {
  protected teamList: ITeam[] = [];
  protected lengthList: number[] = [];

  state = {
    teams: this.teamList,
  };

  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    await this.getTeamsFromService();
    await this.setPointsLength();
    await this.animatePoints();
  }

  async getTeamsFromService() {
    this.setState({
      teams: (await getTeams()).sort((a, b) => b.points - a.points),
    });
  }

  async setPointsLength() {
    await this.getTeamsFromService();
    const lengths: number[] = [];
    this.state.teams.forEach((team) => {
      let length = "";
      if ((team.points * 100) / this.state.teams[0].points < 3) {
        length = "25px";
      } else {
        length = (team.points * 100) / this.state.teams[0].points + "%";
      }
      document.getElementById(team.id.toString())!.style.width = length;
    });
  }

  async animatePoints() {
    console.log("animate", this.state.teams);
    const nbTeams = this.state.teams.length;
    this.state.teams.forEach((team, index) => {
      console.log("coucou");
      const elem = document.getElementById(team.id.toString());
      elem!.animate(
        [
          // étapes/keyframes
          { transform: "translateX(-100%)" },
          { transform: "translateX(0%)" },
        ],
        {
          // temporisation
          duration: 1000,
          easing: "ease-in-out",
          delay: nbTeams - index * 100,
          fill: "both",
        }
      );
    });
    this.state.teams.forEach((team, index) => {
      console.log("coucou");
      const elem = document.getElementById("name" + team.id.toString());
      elem!.animate(
        [
          // étapes/keyframes

          { opacity: "0" },
          { opacity: "1" },
        ],
        {
          // temporisation
          duration: 1000,
          easing: "ease-in-out",
          delay: nbTeams - index * 100 + 500,
          fill: "both",
        }
      );
    });
    this.state.teams.forEach((team, index) => {
      console.log("coucou");
      const elem = document.getElementById("cover" + team.id.toString());
      elem!.animate(
        [
          // étapes/keyframes
          { transform: "translateX(50%)" },
          { transform: "translateX(0%)" },
        ],
        {
          // temporisation
          duration: 1000,
          easing: "ease-in-out",
          delay: nbTeams - index * 100 + 500,
          fill: "both",
        }
      );
    });
  }

  render() {
    return (
      <div className="prewei page">
        <div className="title">
          <h1>Classement Actuel</h1>
        </div>
        <div className="classement">
          <div className="teams">
            {this.state.teams.map((team, index) => (
              <div className="team">
                <div className="points-container">
                  <div id={team.id.toString()} className={"points p" + index}>
                    <div className="points-text">{team.points}</div>
                  </div>
                </div>
                <div id={"name" + team.id.toString()} className="team-nom">
                  <img
                    src={require("../../Assets/Images/equipes/" +
                      team.nom +
                      ".jpg")}
                  />
                  <div
                    id={"cover" + team.id.toString()}
                    className="cover"
                  ></div>
                  <div className="txt">{team.nom}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="boutons">
          <div className="bouton">+ Remplir un défi</div>
          <div className="bouton light">Liste des défis</div>
        </div>
      </div>
    );
  }
}
