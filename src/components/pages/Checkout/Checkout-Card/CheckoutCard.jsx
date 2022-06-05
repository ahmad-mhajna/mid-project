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
        <p className="card-text">{this.props.food.price}</p>
        <Button
          text="+1"
          onClick={() => {
            this.props.addToCart((prevState) => {
              const stateCopy = [...prevState];
              const foodCopy = stateCopy.find(
                (item) => item.id === this.props.food.id
              );
              foodCopy.quantity++;
              return stateCopy;
            });
          }}
        />
        <p className="card-text">{this.props.food.quantity}</p>
        <Button
          text="-1"
          onClick={() => {
            this.props.addToCart((prevState) => {
              if (this.props.food.quantity > 1) {
                const stateCopy = [...prevState];
                const foodCopy = stateCopy.find(
                  (item) => item.id === this.props.food.id
                );
                foodCopy.quantity--;
                return stateCopy;
              } else {
                return prevState.filter(
                  (item) => item.id !== this.props.food.id
                );
              }
            });
          }}
        />
        <Button
          text="Remove"
          onClick={() => {
            this.props.addToCart((prevState) => {
              return prevState.filter((item) => item.id !== this.props.food.id);
            });
          }}
        />
      </div>
    );
  }
}
export default CheckoutCard;
