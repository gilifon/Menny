import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";
import HomePage from "./components/HomePage";

export class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/:branch_id"
          render={props => (
            <HomePage branch_id={props.match.params.branch_id} />
          )}
        />

        <Route
          path="/:branch_id/:language_id"
          render={props => (
            <Menu
              branch_id={props.match.params.branch_id}
              language_id={props.match.params.language_id}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
