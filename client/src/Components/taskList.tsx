import React from "react";
import axios from "axios";
import { ITask } from "../types/types";

export class TaskList extends React.Component {
  state: ITask = {
    task: "",
  };

  onDelete() {
    console.log("delete");
  }

  setTask(task: string) {
    console.log(task);
    this.setState({
      task: task,
    });
  }

  onDone() {
    console.log("done");
    console.log(this.state.task);
  }

  onSubmit() {
    console.log("submit", this.state.task);
    axios.post("http://localhost:4000/task", { task: this.state.task });
  }

  render() {
    return (
      <div>
        <h3 className="">TaskList</h3>
        <div className="ui input">
          <input
            value={this.state.task}
            onChange={(e) => this.setTask(e.target.value)}
            placeholder="your task..."
          ></input>
        </div>
        <button
          className="ui primary button basic"
          onClick={(e) => this.onSubmit()}
        >
          {this.state.task}
        </button>
        <hr />
        <div className="ui cards">
          <div className="card">
            <div className="content">
              <div className="meta">{this.state.task}</div>
              <div
                className="ui basic green button"
                onClick={(e) => this.onDone}
              >
                Done
              </div>
              <div
                className="ui basic red button"
                onClick={(e) => this.onDelete}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
