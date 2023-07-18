import React from "react";
import axios from "axios";
import { ITeam } from "../types/types";

export const getTeams = async () => {
  const teams: ITeam[] = [];
  await axios.get("http://localhost:4000/equipes").then((res) => {
    res.data.forEach((element: ITeam) => {
      teams.push({
        id: element.id,
        nom: element.nom,
        points: element.points,
      });
    });
  });
  return teams;
};

export const getTeamById = async (id: number) => {
  let team: ITeam | null = null;
  await axios.get("http://localhost:4000/equipe/" + id).then((res) => {
    team = {
      id: res.data[0].id,
      nom: res.data[0].nom,
      points: res.data[0].points,
    };
  });
  return team;
};

export const getFamilles = async () => {
  const familles: ITeam[] = [];
  await axios.get("http://localhost:4000/familles").then((res) => {
    res.data.forEach((element: ITeam) => {
      familles.push({
        id: element.id,
        nom: element.nom,
        points: element.points,
      });
    });
  });
  return familles;
};
