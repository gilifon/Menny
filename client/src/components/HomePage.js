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
      console.log(res);
      
      this.setState({ clientData: res });
    });
  }

  render() {
    return (
      <div className="container p-4 text-center">
        <h1>{this.state.clientData.client_name}</h1>
        <h2>{this.state.clientData.menu_name}</h2>
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
