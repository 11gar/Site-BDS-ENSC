import React from "react";
import axios from "axios";
import { IDefi } from "../types/types";

export const getDefis = async () => {
  const defis: IDefi[] = [];
  await axios.get("http://localhost:4000/defis").then((res) => {
    res.data.forEach((element: IDefi) => {
      defis.push({
        id: element.id,
        nom: element.nom,
        description: element.description,
        points: element.points,
      });
    });
  });
  return defis;
};

export const searchDefi = async (search: string) => {
  const defis: IDefi[] = [];
  if (search == "") {
    return getDefis();
  }
  await axios
    .get("http://localhost:4000/defis/search/" + search)
    .then((res) => {
      res.data.forEach((element: IDefi) => {
        defis.push({
          id: element.id,
          nom: element.nom,
          description: element.description,
          points: element.points,
        });
      });
    });
  console.log(defis);
  return defis;
};

export const getDefiById = async (id: number) => {
  let defi: IDefi | null = null;
  await axios.get("http://localhost:4000/defi/" + id).then((res) => {
    defi = {
      id: res.data[0].id,
      nom: res.data[0].nom,
      description: res.data[0].description,
      points: res.data[0].points,
    };
  });
  return defi;
};

export const getDefisByEquipe = async (idEquipe: number) => {
  let idDefis: number[] = [];
  await axios
    .get("http://localhost:4000/defis/equipe/" + idEquipe)
    .then((res) => {
      res.data.map((defi: any) => {
        idDefis.push(+defi.idDefi);
      });
    });
  return idDefis;
};

export const getDefisRemplis = async () => {
  let defis: IDefi[] = [];
  await axios.get("http://localhost:4000/defis/remplis/0").then((res) => {
    res.data.map((defi: any) => {
      defis.push(defi);
    });
  });
  return defis;
};

export const updatePointsEquipe = async (idEquipe: number, points: number) => {
  await axios.put("http://localhost:4000/equipe/" + idEquipe, {
    points: points,
  });
};

export const remplirDefi = (
  idDefi: number,
  idEquipe: number,
  preuve: string
) => {
  axios.post("http://localhost:4000/defi/" + idEquipe, {
    idDefi: idDefi,
    preuve: preuve,
  });
};
