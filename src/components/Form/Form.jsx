import React from "react";
import Button from "../Button/Button";
import Input from "../input/Input";
import { Link } from "react-router-dom";
import "./Form.css";
class Form extends React.Component {
  render() {
    return (
      <form action="/" onSubmit={this.props.onSubmit}>
        <Input
          label="Name"
          placeholder="Enter Name..."
          value={this.props.food.name}
          onChange={(event) => {
            this.props.setFood({
              ...this.props.food,
              name: event.target.value,
            });
          }}
        />
        <Input
          type="checkbox"
          label="isVegan"
          placeholder="Enter is it vegan"
          value={this.props.food.isVegan}
          onChange={(event) => {
            this.props.setFood({
              ...this.props.food,
              isVegan: event.target.value,
            });
          }}
        />
        <Input
          label="ingredients"
          placeholder="Enter ingredients..."
          value={this.props.food.ingredients}
          onChange={(event) => {
            this.props.setFood({
              ...this.props.food,
              ingredients: [event.target.value],
            });
          }}
        />
        <Input
          label="img"
          placeholder="Enter img..."
          value={this.props.food.img}
          onChange={(event) => {
            this.props.setFood({
              ...this.props.food,
              img: event.target.value,
            });
          }}
        />
        <Input
          label="Price"
          placeholder="Enter Price..."
          value={this.props.food.price}
          type="number"
          onChange={(event) => {
            this.props.setFood({
              ...this.props.food,
              price: +event.target.value,
            });
          }}
        />
        <Button type="submit" text={this.props.isEdit ? "Edit" : "Add"} />
        <Link to="/">Back</Link>
      </form>
    );
  }
}
export default Form;
