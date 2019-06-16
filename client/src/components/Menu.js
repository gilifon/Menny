import React, { Component } from "react";
import API from "../services/API";

export class Menu extends Component {
  state = {
    menuInfo: []
  };
  componentDidMount() {
    API.FilterList(this.props.menu_id).then(res => {
      //this.setState({ menuInfo: res });
      const map = new Map();
      let categories = [];

      for (const dish of res) {
        if (!map.has(dish.category_id)) {
          map.set(dish.category_id, true); // set any value to Map
          categories.push({
            category_id: dish.category_id,
            category_name: dish.category_name
          });
        }
      }
    });
  }

  render() {
    return <div />;
  }
}

export default Menu;
