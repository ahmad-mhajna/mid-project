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
          label="vegan"
          placeholder="Enter vegan..."
          value={this.props.food.vegan}
          onChange={(event) => {
            this.props.setFood({
              ...this.props.food,
              vegan: event.target.value,
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
