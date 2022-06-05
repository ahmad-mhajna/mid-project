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
        {this.props.food.categories.map((category) => (
          <p className="card-text">{category},</p>
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
          text="add to Cart"
          onClick={() => {
            this.props.addToCart((prevState) => {
              if (!prevState.find((item) => item.id === this.props.food.id))
                return [...prevState, this.props.food];
              else {
                const stateCopy = [...prevState];
                const foodCopy = stateCopy.find(
                  (item) => item.id === this.props.food.id
                );
                foodCopy.quantity++;
                return stateCopy;
              }
            });
          }}
        />
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
