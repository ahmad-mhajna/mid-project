import React from "react";
import Button from "../../../Button/Button";
import "./CheckoutCard.css";
class CheckoutCard extends React.Component {
  render() {
    return (
      <div className={`card ${this.props.className || ""}`}>
        <img
          className="card-text"
          src={this.props.food.img}
          alt="img of food"
        />
        <p className="card-text">{this.props.food.name}</p>
        {this.props.food.ingredients.map((ingredient) => (
          <p className="card-text">{ingredient},</p>
        ))}
        <p className="card-text">{this.props.food.price}</p>
        <Button text="Remove" />
      </div>
    );
  }
}
export default CheckoutCard;