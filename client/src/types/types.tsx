export interface ITask {
  task: string;
}

export interface IUser {
  id: number;
  password: string;
  pseudo: string;
  nom: string;
  prenom: string;
  famille?: string;
  equipe?: string;
}

export interface IRoute {
  path: string;
  component: any;
}

export interface ITeam {
  id: number;
  nom: string;
  points: number;
}

export interface IDefi {
  id: number;
  nom: string;
  description: string;
  points: number;
}

export type Id = {
  id: string;
};
