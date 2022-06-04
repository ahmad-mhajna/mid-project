import React from "react";
import "./Card.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
class Card extends React.Component {
  render() {
    return (
      <div className={`card ${this.props.className || ""}`}>
        <img
          className="card-text"
          src={this.props.food.img}
          alt="img of food"
        />
        <p className="card-text">{this.props.food.name}</p>
        <p className="card-text">
          {this.props.food.isVegan ? "is Vegan" : "isn't Vegan"}
        </p>
        {this.props.food.ingredients.map((ingredient) => (
          <p className="card-text">{ingredient.label},</p>
        ))}
        <p className="card-text">{this.props.food.price}</p>
        <Link
          onClick={() => {
            this.props.editFood(this.props.food);
          }}
          to="/form"
        >
          Edit
        </Link>
        <Button
          text="Delete"
          onClick={this.props.deleteFood}
          id={this.props.food.id}
        />
      </div>
    );
  }
}
export default Card;
