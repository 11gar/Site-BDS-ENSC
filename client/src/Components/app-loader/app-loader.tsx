import React from "react";

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader">
        <div className="loaderContent">
          <div className="loader"></div>
          <div className="text">Chargement...</div>
        </div>
      </div>
    );
  }
}
