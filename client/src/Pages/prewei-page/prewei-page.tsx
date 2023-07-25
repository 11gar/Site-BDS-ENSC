import React from "react";
import { Id } from "../../types/types";
import "./prewei-page.scss";
import "../../styles/basics.scss";
import { ITeam, IDefi } from "../../types/types";
import { getTeams, getTeamById } from "../../services/equipe.service";
import {
  getDefis,
  remplirDefi,
  updatePointsEquipe,
  getDefisByEquipe,
  getDefisRemplis,
} from "../../services/defi.service";
import { getProps } from "../../functions";
import Loader from "../../Components/app-loader/app-loader";
import { useParams, Link } from "react-router-dom";

function withParams(Component: any) {
  return function WrappedComponent(props: any) {
    const params = useParams<Id>();
    return <Component {...props} {...params} />;
  };
}

class PreweiPage extends React.Component {
  protected lengthList: number[] = [];
  protected user: number | null = null;
  protected readableProps: any;

  state = {
    loading: true,
    fillingDefi: false,
    teams: [] as ITeam[],
    defis: [] as IDefi[],
    userTeam: null as number | null,
    idDefi: null as number | null,
    preuve: null as string | null,
    error: null as string | null,
    derniersDefisRemplis: [] as IDefi[],
  };

  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    this.user = +localStorage.getItem("user")!;

    await this.doOnStart();
    this.setState({ loading: false });
    if (!this.state.userTeam) {
      this.setState({ userTeam: this.state.teams[0].id });
    }
    if (!this.state.idDefi) {
      this.setState({ idDefi: this.state.defis[0].id });
    }
    this.readableProps = getProps(this.props);

    if (this.readableProps.defi != undefined) {
      this.setState({ fillingDefi: true });
      this.setState({ idDefi: +this.readableProps.defi });

      var defisSorted: IDefi[] = [];
      defisSorted.push(
        this.state.defis.find((defi) => defi.id == +this.readableProps.defi)!
      );
      this.state.defis.forEach((defi) => {
        if (defi.id != +this.readableProps.defi) {
          defisSorted.push(defi);
        }
      });

      this.setState({ defis: defisSorted });
    }
  }

  async doOnStart() {
    await this.getTeamsFromService();
    await this.getDefisFromService();
    await this.setPointsLength();
    await this.animatePoints();
    await this.getDerniersDefisRemplis();
  }

  async getTeamsFromService() {
    this.setState({
      teams: (await getTeams()).sort((a, b) => b.points - a.points),
    });
  }
  async getDefisFromService() {
    this.setState({
      defis: (await getDefis()).sort((a, b) => a.id - b.id),
    });
  }

  async getDerniersDefisRemplis() {
    this.setState({
      derniersDefisRemplis: (await getDefisRemplis()).sort(
        (a, b) => b.id - a.id
      ),
    });
  }

  async setPointsLength() {
    await this.getTeamsFromService();
    const lengths: number[] = [];
    this.state.teams.forEach((team) => {
      let length = "";
      if ((team.points * 100) / this.state.teams[0].points < 10) {
        length = "10%";
      } else {
        length = (team.points * 100) / this.state.teams[0].points + "%";
      }
      document.getElementById(team.id.toString())!.style.width = length;
    });
  }

  async animatePoints() {
    const nbTeams = this.state.teams.length;
    this.state.teams.forEach((team, index) => {
      const elem = document.getElementById(team.id.toString());
      elem!.animate(
        [
          // étapes/keyframes
          { transform: "translateX(-100%)" },
          { transform: "translateX(0%)" },
        ],
        {
          // temporisation
          duration: 1000,
          easing: "ease-in-out",
          delay: nbTeams - index * 100,
          fill: "both",
        }
      );
    });
    this.state.teams.forEach((team, index) => {
      const elem = document.getElementById("name" + team.id.toString());
      elem!.animate(
        [
          // étapes/keyframes

          { opacity: "0" },
          { opacity: "1" },
        ],
        {
          // temporisation
          duration: 1000,
          easing: "ease-in-out",
          delay: nbTeams - index * 100 + 500,
          fill: "both",
        }
      );
    });
    this.state.teams.forEach((team, index) => {
      const elem = document.getElementById("cover" + team.id.toString());
      elem!.animate(
        [
          // étapes/keyframes
          { transform: "translateX(50%)" },
          { transform: "translateX(0%)" },
        ],
        {
          // temporisation
          duration: 1000,
          easing: "ease-in-out",
          delay: nbTeams - index * 100 + 500,
          fill: "both",
        }
      );
    });
  }

  async postDefi() {
    if (this.state.idDefi && this.state.userTeam && this.state.preuve) {
      const pts = this.state.defis.find(
        (defi) => defi.id == this.state.idDefi
      )!.points;
      const team = this.state.teams.find(
        (team) => team.id == this.state.userTeam
      );

      const defisEquipe = await getDefisByEquipe(this.state.userTeam);
      if (defisEquipe == null || !defisEquipe.includes(this.state.idDefi)) {
        remplirDefi(this.state.userTeam, this.state.idDefi, this.state.preuve);
        updatePointsEquipe(this.state.userTeam, +team!.points + +pts);
        this.setState({ fillingDefi: false });
        this.doOnStart();
      } else {
        this.setState({
          error: "L'équipe " + team!.nom + " a déjà rempli ce défi !",
        });
      }
    } else {
      this.setState({
        error: "Un champ n'a pas été rempli",
      });
    }

    return;
  }

  render() {
    return (
      <div className="prewei page">
        {this.state.loading ? (
          <div className="loading">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <div className="title">
          <h1>Classement Actuel</h1>
        </div>
        <div className="classement">
          <div className="teams">
            {this.state.teams.map((team, index) => (
              <div className="team">
                <div className="points-container">
                  <div id={team.id.toString()} className={"points p" + index}>
                    <div className="points-text">{team.points}</div>
                  </div>
                </div>
                <div id={"name" + team.id.toString()} className="team-nom">
                  <img
                    src={require("../../Assets/Images/equipes/" +
                      team.nom +
                      ".jpg")}
                  />
                  <div
                    id={"cover" + team.id.toString()}
                    className="cover"
                  ></div>
                  <div className="txt">{team.nom}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="boutons">
          <div
            className="bouton"
            onClick={(e) => this.setState({ fillingDefi: true })}
          >
            + Remplir un défi
          </div>
          <Link className="b" to="/defis">
            <div className="bouton light">Liste des défis</div>
          </Link>
        </div>
        <div className="derniersDefisRemplis"></div>

        {this.state.fillingDefi ? (
          <div className="defiTab">
            <div className="content">
              <div className="line">
                <div className="c1">
                  <div className="txt">1</div>
                  <div className="ligne" />
                </div>
                <div className="c2">
                  Déposer la vidéo sur ce groupe Facebook :
                </div>
              </div>

              <div className="line">
                <div className="c1">
                  <div className="txt">2</div>
                  <div className="ligne" />
                </div>
                <div className="c2">Remplir le formulaire :</div>
              </div>

              <div className="line noHeight">
                <div className="c1">
                  <div className="ligne" />
                </div>
                <div className="c2">
                  <form>
                    Equipe :
                    <select
                      name="equipe"
                      placeholder="Equipe"
                      onChange={(e) =>
                        this.setState({ userTeam: e.target.value })
                      }
                    >
                      {this.state.teams.map((team) => (
                        <option value={team.id}>{team.nom}</option>
                      ))}
                    </select>
                    Défi :
                    <select
                      placeholder="défi"
                      onChange={(e) =>
                        this.setState({ idDefi: e.target.value })
                      }
                    >
                      {this.state.defis.map((defi) => (
                        <option value={defi.id}>
                          {"#" + defi.id + " : " + defi.nom}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Lien du post Facebook"
                      onChange={(e) =>
                        this.setState({ preuve: e.target.value })
                      }
                    />
                    {this.state.error ? (
                      <p className="error">Erreur : {this.state.error}</p>
                    ) : (
                      ""
                    )}
                    <div
                      className="bouton valider"
                      onClick={() => this.postDefi()}
                    >
                      Valider le défi !
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="bouton bottom"
                onClick={(e) => this.setState({ fillingDefi: false })}
              >
                Retour
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withParams(PreweiPage);
