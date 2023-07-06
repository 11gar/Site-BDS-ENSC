export interface ITask {
  task: string;
}

export interface IUser {
  id: number;
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

export type Id = {
  id: string;
};
