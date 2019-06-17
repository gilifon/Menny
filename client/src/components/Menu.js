import React, { Component } from "react";
import API from "../services/API";

export class Menu extends Component {
  state = {
    client_data: null,
    menu: []
  };
  async componentDidMount() {
    const client_data = await API.GetBranch(this.props.branch_id);
    this.setState({ client_data });
    if (this.state.client_data.client_default_language.toString() === this.props.language_id.toString())
    {
      const menu = await API.GetDefaultMenu(this.props.branch_id, this.props.language_id);
      this.setState({ menu });
    }
    else
    {
      const menu = await API.GetMenu(this.props.branch_id, this.props.language_id);
      this.setState({ menu });
    }
    
    // API.FilterList(this.props.branch_id, this.props.language_id).then(res => {
    //   //this.setState({ menuInfo: res });
    //   const map = new Map();
    //   let categories = [];

    //   for (const dish of res) {
    //     if (!map.has(dish.category_id)) {
    //       map.set(dish.category_id, true); // set any value to Map
    //       categories.push({
    //         category_id: dish.category_id,
    //         category_name: dish.category_name
    //       });
    //     }
    //   }
    // });
  }

  render() {
    return <div>
      Branch ID: {this.props.branch_id} <br/>
      Language ID: {this.props.language_id} <br/>
    </div>;
  }
}

export default Menu;
