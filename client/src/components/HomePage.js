import React, { Component } from "react";
import API from "../services/API";

export class HomePage extends Component {
  state = {
    languages: [],
    clientData: ""
  };

  componentDidMount() {
    API.GetLanguages(this.props.branch_id).then(res => {
      this.setState({ languages: res });
    });
    API.GetBranch(this.props.branch_id).then(res => {
      this.setState({ clientData: res });
    });
  }

  render() {
    return (
      <div className="container p-4 text-center text-light">
        <h1 className="mb-2 text-border ">
          {this.state.clientData.client_name}
        </h1>
        <div className="alert bg-light text-dark" role="alert">
          <h4>{this.state.clientData.client_description}</h4>
        </div>
        {this.state.languages.map(language => (
          <a
            key={language._id}
            className="btn btn-primary m-2"
            href={"/" + this.props.branch_id + "/" + language._id}
            role="button"
          >
            {language.name}
          </a>
        ))}
      </div>
    );
  }
}

export default HomePage;
