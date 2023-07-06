import React from "react";
import axios from "axios";
import { IUser } from "../types/types";

export const getUsers = async () => {
  const users: IUser[] = [];
  await axios.get("http://localhost:4000/users").then((res) => {
    res.data.forEach((element: IUser) => {
      users.push({
        id: element.id,
        pseudo: element.pseudo,
        nom: element.nom,
        prenom: element.prenom,
        famille: element.famille,
        equipe: element.equipe,
      });
    });
  });
  return users;
};
