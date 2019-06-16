import React, { Component } from "react";
import API from "../services/API";

export class HomePage extends Component {
  state = {
    languages: []
  };

  componentDidMount() {
    API.GetLanguages(this.props.branch_id).then(res => {
      this.setState({ languages: res });
    });
  }

  render() {
    return (
      <div className="container p-4">
        {this.state.languages.map(item => (
          <a
            key={item._id}
            className="btn btn-primary m-2"
            href={"/" + this.props.branch_id + "/" + item._id}
            role="button"
          >
            {item.name}
          </a>
        ))}
      </div>
    );
  }
}

export default HomePage;
