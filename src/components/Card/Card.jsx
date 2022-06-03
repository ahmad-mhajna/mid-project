import React from "react";
import "./Card.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <p className="card-text">{this.props.food.name}</p>
        <p className="card-text">{this.props.food.vegan}</p>
        <p className="card-text">{this.props.food.whatisinit}</p>
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
