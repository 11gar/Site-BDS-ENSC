import React from "react";
import "./defis-page.scss";
import "../../styles/basics.scss";
import { ITeam, IDefi } from "../../types/types";
import { getTeams, getTeamById } from "../../services/equipe.service";
import {
  searchDefi,
  getDefis,
  remplirDefi,
  updatePointsEquipe,
  getDefisByEquipe,
} from "../../services/defi.service";
import {
  createCookie,
  deleteCookie,
  getCookie,
  getProps,
} from "../../functions";
import Loader from "../../Components/app-loader/app-loader";
import { useParams, Link } from "react-router-dom";

export default class DefisPage extends React.Component {
  state = {
    unroll: "",
    loading: true,
    defis: [] as IDefi[],
    search: "",
  };

  async componentDidMount() {
    await this.load();
    this.setState({ loading: false });
  }

  async load() {
    this.setState({ defis: await getDefis() });
  }

  async search(src: string) {
    this.setState({ defis: await searchDefi(src) });
  }

  render() {
    return (
      <div className="defispage page">
        {this.state.loading ? (
          <div className="loading">
            <Loader />
          </div>
        ) : (
          <div className="content">
            <h1 className="title">Liste des défis</h1>
            <input
              placeholder="Rechercher un défi..."
              onChange={(e) => this.search(e.target.value)}
            ></input>
            <div className="defis">
              {this.state.defis.map((defi) => (
                <div
                  className={
                    "defi " +
                    (this.state.unroll == defi.id.toString() ||
                    this.state.unroll == "all"
                      ? "unroll"
                      : "")
                  }
                  onClick={() =>
                    this.setState({
                      unroll:
                        defi.id.toString() == this.state.unroll ? "" : defi.id,
                    })
                  }
                >
                  <div className="slot id">{defi.id}</div>
                  <div className="slot nom">{defi.nom}</div>
                  <div className="slot description">
                    {defi.description.length > 15
                      ? defi.description.slice(0, 15) + "..."
                      : defi.description}
                  </div>
                  <div className="slot points">{defi.points}</div>
                  <div className="slot remplir">
                    <Link to={"/prewei/" + defi.id}>
                      <div className="bouton">✓</div>
                    </Link>
                  </div>

                  <div className="break"></div>
                  {this.state.unroll == defi.id.toString() ||
                  this.state.unroll == "all" ? (
                    <div className="slot descriptionFull">
                      <div className="text">{defi.description}</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
