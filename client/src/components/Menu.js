import React, { Component } from "react";
import API from "../services/API";
import Category from "./Category";

export class Menu extends Component {
  state = {
    client_data: [],
    menu: [],
    language: []
  };
  async componentDidMount() {
    const client_data = await API.GetBranch(this.props.branch_id);
    this.setState({ client_data });
    if (this.state.client_data.client_default_language.toString() === this.props.language_id.toString())
    {
      API.GetDefaultMenu(this.props.branch_id, this.props.language_id).then(rawMenu=>{
        this.setState({ menu: this.parseMenu(rawMenu) });
      });      
    }
    else
    {
      API.GetMenu(this.props.branch_id, this.props.language_id).then(rawMenu => {
        this.setState({ menu: this.parseMenu(rawMenu) });
      });
    }
    API.GetLanguage(this.props.language_id).then(language => {
      this.setState({ language:language });
    });
  }

  parseMenu(menu){
    const map = new Map();
      let parsedMenu = [];
      for (const menuItem of menu) {
        //check if it exists
        if (!map.has(menuItem.category_id)) {
          //if not - set it
          map.set(menuItem.category_id, true);
          //and add the category
          parsedMenu.push({
            category_id: menuItem.category_id,
            category_name: menuItem.category_name,
            category_description: menuItem.category_description,
            dishes: menu.filter(p=>p.category_id === menuItem.category_id)
          });
        }
      }      
      return parsedMenu;
    }

  render() {

    return <div className="mt-2">
      {this.state.menu.map(category=>(
        <Category key={category.category_id} category={category} language={this.state.language}></Category>
      ))}
    </div>;
  }
}

export default Menu;
