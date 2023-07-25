import React from "react";
import axios from "axios";
import { IUser } from "../types/types";

export const createUser = async (user: IUser) => {
  console.log("user", user);
  await axios.post("http://localhost:4000/user", user);
  return true;
};

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

export const getUserByLoginAndPassword = async (
  login: string,
  password: string
) => {
  let id: number | null = null;
  await axios
    .get("http://localhost:4000/user/" + login + "/" + password)
    .then((res) => {
      if (res.data[0]) {
        if (res.data[0].id) {
          id = res.data[0].id;
        }
      }
    });
  return id;
};
