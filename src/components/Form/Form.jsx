import React from "react";
import Button from "../Button/Button";
import Input from "../input/Input";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import "./Form.css";
const categories = [
  "Burger",
  "Sweets",
  "Icecream",
  "Sandwiches",
  "BBQ",
  "Bakery",
  "Pizza",
  "Italian",
  "Shawarma",
  "Drinks",
  "Hummus Falafel",
  "Fried Chicken",
  "Seafood",
  "Asian",
  "Vegan",
];
class Form extends React.Component {
  state = { inputValue: "" };
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

        <CreatableSelect
          components={{ DropdownIndicator: null }}
          isClearable
          isMulti
          menuIsOpen={false}
          inputValue={this.state.inputValue}
          onInputChange={(inputValue) => {
            this.setState({ inputValue });
          }}
          onChange={(value) => {
            this.props.setFood({
              ...this.props.food,
              ingredients: value.map((value) => value.label),
            });
          }}
          onKeyDown={(event) => {
            if (!this.state.inputValue) return;
            if (event.key === "Enter") {
              this.props.setFood({
                ...this.props.food,
                ingredients: [
                  ...this.props.food.ingredients,
                  this.state.inputValue,
                ],
              });
              this.setState({
                inputValue: "",
              });
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          value={this.props.food.ingredients.map((ingredient) => ({
            label: ingredient,
            value: ingredient,
          }))}
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
        <Select
          options={categories.map((category) => ({
            label: category,
            value: category,
          }))}
          isMulti
          onChange={(value) => {
            this.props.setFood({
              ...this.props.food,
              categories: value.map((value) => value.label),
            });
          }}
          value={this.props.food.categories.map((category) => ({
            label: category,
            value: category,
          }))}
        />
        <Button type="submit" text={this.props.isEdit ? "Edit" : "Add"} />
        <Link to="/products">Back</Link>
      </form>
    );
  }
}
export default Form;
