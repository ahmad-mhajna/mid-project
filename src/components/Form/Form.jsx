import React from "react";
import Button from "../Button/Button";
import Input from "../input/Input";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import "./Form.css";
const categories = [
  { label: "Burger", value: "Burger" },
  { label: "Sweets", value: "Sweets" },
  { label: "Icecream", value: "Icecream" },
  { label: "Sandwiches", value: "Sandwiches" },
  { label: "BBQ", value: "BBQ" },
  { label: "Bakery", value: "Bakery" },
  { label: "Pizza", value: "Pizza" },
  { label: "Italian", value: "Italian" },
  { label: "Shawarma", value: "Shawarma" },
  { label: "Drinks", value: "Drinks" },
  { label: "Hummus Falafel", value: "Hummus Falafel" },
  { label: "Fried Chicken", value: "Fried Chicken" },
  { label: "Seafood", value: "Seafood" },
  { label: "Asian", value: "Asian" },
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
        <Input
          type="checkbox"
          label="isVegan"
          placeholder="Enter is it vegan"
          value={this.props.food.isVegan}
          onChange={(event) => {
            this.props.setFood({
              ...this.props.food,
              isVegan: event.target.checked,
            });
          }}
          required={false}
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
            this.props.setFood({ ...this.props.food, ingredients: value });
          }}
          onKeyDown={(event) => {
            if (!this.state.inputValue) return;
            if (event.key === "Enter") {
              this.props.setFood({
                ...this.props.food,
                ingredients: [
                  ...this.props.food.ingredients,
                  {
                    label: this.state.inputValue,
                    value: this.state.inputValue,
                  },
                ],
              });
              this.setState({
                inputValue: "",
              });
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          value={this.props.food.ingredients}
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
          options={categories}
          isMulti
          onChange={(value) => {
            this.props.setFood({ ...this.props.food, categories: value });
          }}
          value={this.props.food.categories}
        />
        <Button type="submit" text={this.props.isEdit ? "Edit" : "Add"} />
        <Link to="/products">Back</Link>
      </form>
    );
  }
}
export default Form;
