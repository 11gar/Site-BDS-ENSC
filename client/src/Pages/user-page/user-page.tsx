import React from "react";
import { useParams } from "react-router-dom";
import { Id } from "../../types/types";
import {} from "../../functions";
import { stat } from "fs";
import "./user-page.scss";
import "../../styles/basics.scss";
import { IUser, ITeam } from "../../types/types";
import {
  getUserByLoginAndPassword,
  getUsers,
  createUser,
} from "../../services/user.service";
import { getFamilles, getTeams } from "../../services/equipe.service";
import userEvent from "@testing-library/user-event";

export default class UserPage extends React.Component {
  state = {
    user: null as IUser | null,
    cree: "",
    login: "",
    password: "",
    loading: true,
    loginerror: null as string | null,
    register: false,
    registernom: null as string | null,
    registerprenom: null as string | null,
    registerlogin: null as string | null,
    registerpassword: null as string | null,
    registererror: null as string | null,
    registermail: null as string | null,
    registerannee: null as number | null,
    userTeam: null as ITeam | null,
    userFamille: null as ITeam | null,
  };

  protected allUsers: IUser[] = [];
  protected equipes: ITeam[] = [];
  protected familles: ITeam[] = [];

  async componentDidMount() {
    await this.load();
    this.setState({ loading: false });
    console.log(this.equipes);
    console.log(this.state.userTeam);
  }
  async componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ) {}

  async load() {
    const user = localStorage.getItem("user");
    console.log("user,", user);
    this.allUsers = await getUsers();
    this.familles = await getFamilles();
    this.equipes = await getTeams();

    if (user) {
      console.log(this.allUsers.find((u) => u.id == +user));
      await this.promisedSetState({
        user: this.allUsers.find((u) => u.id == +user),
        userTeam: this.equipes.find(
          (e) => e.id == +this.allUsers.find((u) => u.id == +user)?.equipe!
        ),
        userFamille: this.familles.find(
          (e) => e.id == +this.allUsers.find((u) => u.id == +user)?.famille!
        ),
      });
    }
  }

  async login() {
    if (this.state.login && this.state.password) {
      const id = await getUserByLoginAndPassword(
        this.state.login,
        this.state.password
      );
      if (id) {
        this.setState({ user: this.allUsers.find((u) => u.id == id) });
      } else {
        this.setState({ loginerror: "Identifiants incorrects..." });
      }
      localStorage.setItem("user", id as any);
    } else {
      this.setState({ loginerror: "Remplissez tous les champs" });
    }
    console.log("userlocal", localStorage.getItem("user"));
    this.load();
  }

  async logout() {
    this.setState({ user: null, idUser: null });
    localStorage.setItem("user", null as any);
  }

  async register() {
    this.setState({
      register: !this.state.register,
      loginerror: null,
      registererror: null,
    });
  }

  async register2() {
    if (
      this.state.registerlogin &&
      this.state.registerpassword &&
      this.state.registernom &&
      this.state.registerprenom &&
      this.state.registermail &&
      this.state.registerpassword &&
      this.state.registerannee
    ) {
      const user = this.allUsers.find(
        (u) => u.pseudo == this.state.registerlogin
      );
      const mail = this.allUsers.find((u) => u.mail == this.state.registermail);
      if (user) {
        this.setState({ registererror: "Ce pseudo est déjà utilisé" });
        return;
      }
      if (mail) {
        this.setState({ registererror: "Ce mail est déjà utilisé" });
        return;
      }
      const newUser: IUser = {
        pseudo: this.state.registerlogin,
        nom: this.state.registernom,
        prenom: this.state.registerprenom,
        mail: this.state.registermail,
        password: this.state.registerpassword,
        annee: this.state.registerannee,
      };
      createUser(newUser);
      console.log("prout");
      this.setState({ register: false });
      this.setState({ cree: "Ton compte a bien été créé !" });
    } else {
      this.setState({ registererror: "Remplissez tous les champs" });
    }
  }

  promisedSetState = (newState: object) =>
    new Promise((resolve) => this.setState(newState, () => resolve(newState)));

  render() {
    return this.state.loading ? (
      <div className="loading">
        <h1>loading...</h1>
      </div>
    ) : (
      <div className="userpage page">
        <div className="content">
          {this.state.user == null ? (
            <div className="pasco">
              <h2>
                {this.state.register
                  ? "Inscris-toi :"
                  : this.state.cree + " Connecte-Toi :"}
              </h2>
              <div className="connectionForm">
                {this.state.register ? (
                  <div className="register">
                    <input
                      key="r1"
                      type="login"
                      name="login"
                      id="login"
                      placeholder="Login"
                      onChange={(e) =>
                        this.setState({ registerlogin: e.target.value })
                      }
                    />
                    <input
                      key="r2"
                      type="password"
                      placeholder="Mot de Passe"
                      onChange={(e) =>
                        this.setState({ registerpassword: e.target.value })
                      }
                    />
                    <input
                      key="r3"
                      type="text"
                      placeholder="Email"
                      onChange={(e) =>
                        this.setState({ registermail: e.target.value })
                      }
                    />
                    <input
                      key="r4"
                      type="text"
                      placeholder="Nom"
                      onChange={(e) =>
                        this.setState({ registernom: e.target.value })
                      }
                    />
                    <input
                      key="r5"
                      type="text"
                      placeholder="Prenom"
                      onChange={(e) =>
                        this.setState({ registerprenom: e.target.value })
                      }
                    />
                    <input
                      key="r6"
                      type="number"
                      placeholder="Annee"
                      onChange={(e) =>
                        this.setState({ registerannee: e.target.value })
                      }
                    />
                    <div className="error">{this.state.registererror}</div>
                  </div>
                ) : (
                  <div className="logging">
                    <input
                      key="l1"
                      type="login"
                      name="login"
                      id="login"
                      placeholder="Login"
                      onChange={(e) => this.setState({ login: e.target.value })}
                    />
                    <input
                      key="l2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Mot de Passe"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                    <div className="error">{this.state.loginerror}</div>
                  </div>
                )}

                {!this.state.register ? (
                  <div className="register">
                    <div className="bouton" onClick={(e) => this.login()}>
                      Se connecter
                    </div>
                    <div
                      className="bouton light"
                      onClick={(e) => this.register()}
                      key="register"
                    >
                      Creer un compte
                    </div>
                  </div>
                ) : (
                  <div className="register">
                    <div className="bouton" onClick={(e) => this.register2()}>
                      S'inscrire
                    </div>
                    <div
                      className="bouton light"
                      onClick={(e) => this.register()}
                      key="unregister"
                    >
                      Déjà un compte ?
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="profile">
              <h4>Vous êtes connectés en tant que {this.state.user.prenom}</h4>
              <h2>{this.state.userTeam?.nom}</h2>
              <div className="bouton" onClick={(e) => this.logout()}>
                Deconnexion
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
