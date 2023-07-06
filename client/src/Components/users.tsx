import React from "react";
import axios from "axios";
import { IUser } from "../types/types";
import { getUsers } from "../services/user.service";
import { ITeam } from "../types/types";
import { getTeams } from "../services/equipe.service";
import { get } from "http";

export class UserList extends React.Component {
  protected userList: IUser[] = [];
  protected teamList: ITeam[] = [];
  protected user: IUser = {
    id: 0,
    pseudo: "cc",
    nom: "moi",
    prenom: "lui",
  };
  protected team: ITeam = {
    id: 0,
    nom: "cc",
    points: 0,
  };

  constructor(props: any) {
    super(props);
    this.userList.push(this.user);
    this.teamList.push(this.team);
  }

  state = {
    users: this.userList,
    teams: this.teamList,
  };

  async getTeams() {
    this.setState({ teams: await getTeams() });
  }

  async getUsers() {
    this.setState({ users: await getUsers() });
  }

  render() {
    return (
      <div>
        <h3 className="">UserList</h3>
        <div onClick={(e) => this.getTeams()}>
          {this.state.teams.map(
            (team) => team.id + " " + team.nom + " " + team.points + " "
          )}
        </div>
      </div>
    );
  }
}
