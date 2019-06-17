import React, { Component } from 'react'

export class Category extends Component {
    async componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            
            <div  className={(this.props.language.language_direction === "ltr")?"text-left":"text-right"} style={{direction:this.props.language.language_direction}}>
                <div className="container">
                    <div className="alert alert-primary" role="alert">
                        <h2>{this.props.category.category_name}</h2>
                        <p>{this.props.category.category_description}</p>
                    </div>
                    <div className="container">
                        {this.props.category.dishes.map(dish=>(
                            <div key={dish.dish_id} className="alert alert-secondary" role="alert">
                            <h4>{dish.dish_name} ({dish.dish_price})</h4>
                            <p>{dish.dish_description}</p>
                            </div>
                        ))}
                    </div>                
                </div>
            </div>
        )
    }
}

export default Category
