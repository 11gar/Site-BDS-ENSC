import React from "react";
import { TaskList } from "../../Components/taskList";
import { UserList } from "../../Components/users";
import "./front-page.scss";
import "../../styles/basics.scss";

export default function FrontPage() {
  return (
    <div className="frontpage page">
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
        <UserList />
      </div>
    </div>
  );
}
