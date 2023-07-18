import React from "react";
import { useParams } from "react-router-dom";
import { Id } from "../../types/types";
import { getCookie, createCookie, deleteCookie } from "../../functions";
import { stat } from "fs";
import "./user-page.scss";
import "../../styles/basics.scss";
import { IUser } from "../../types/types";
import { getUserByLoginAndPassword } from "../../services/user.service";

export default class UserPage extends React.Component {
  state = {
    user: null as number | null,
    login: "",
    password: "",
  };
  async componentDidMount() {
    const user = getCookie("user");
    if (user) {
      this.setState({ user: user });
    }
  }
  async componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ) {
    console.log(this.state.login);
  }

  async login() {
    if (this.state.login && this.state.password) {
      const id = await getUserByLoginAndPassword(
        this.state.login,
        this.state.password
      );
      if (id != null) {
        console.log("caca", id);
        createCookie("user", id);
        this.setState({ user: id });
      }
    }
  }

  async logout() {
    deleteCookie("user");
    this.setState({ user: null });
  }

  render() {
    return (
      <div className="userpage page">
        <div className="content">
          {this.state.user == null ? (
            <div className="pasco">
              <h2>Connecte-Toi :</h2>
              <div className="connectionForm">
                <input
                  type="login"
                  name="login"
                  id="login"
                  placeholder="Login"
                  onChange={(e) => this.setState({ login: e.target.value })}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Mot de Passe"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <div className="bouton" onClick={(e) => this.login()}>
                  Se connecter
                </div>
              </div>
            </div>
          ) : (
            <div className="profile">
              <div className="bouton" onClick={(e) => this.logout()}>
                Deco
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
