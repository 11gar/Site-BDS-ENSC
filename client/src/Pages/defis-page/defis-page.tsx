import React from "react";
import "./defis-page.scss";
import "../../styles/basics.scss";
import { createCookie, deleteCookie } from "../../functions";

export default class FrontPage extends React.Component {
  async componentDidMount() {}
  render() {
    return (
      <div className="defispage page">
        <div className="image">
          <img
            src={require("../../Assets/Images/photoFrontpage.jpg")}
            alt="caca"
          />
          <div className="cover">
            <div className="text">ENSC 2023 - 2024</div>
          </div>
        </div>

        <div className="content">
          <h1>FrontPage</h1>
          {document.cookie}
        </div>
      </div>
    );
  }
}
