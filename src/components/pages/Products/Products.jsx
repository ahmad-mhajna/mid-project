import "./Products.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {} from "react-router-dom";
import Button from "../../Button/Button";
import Input from "../../input/Input";
import Card from "../../Card/Card";
import Select from "react-select";
function Products({ data, deleteFood, setFood, setEdit, category, addToCart }) {
  const spinnerRef = useRef();
  const [search, filterFood] = useState(data);
  const [sort, setsort] = useState("off");
  const [keywords, setKeywords] = useState("");
  const [selectedCategories, setCategories] = useState([]);
  useEffect(() => {
    if (category !== "") {
      setCategories([category]);
    }
  }, []);

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
  const filterBYCategory = (array) => {
    if (selectedCategories.length < 1) {
      return array;
    }
    return array.filter((item) =>
      item.categories
        .map((category) => selectedCategories.includes(category))
        .includes(true)
    );
  };

  useEffect(() => {
    let newArray = [...data];
    newArray = filterBYCategory(newArray);
    newArray = sortByPrice(newArray);
    newArray = newArray.filter((food) => food.name.includes(keywords));
    filterFood(newArray);
    // eslint-disable-next-line
  }, [sort, selectedCategories, keywords, data]);
  const searchbar = (event) => {
    const input = event.target.value;
    setKeywords(input);
  };
  const sortByPrice = (arr) => {
    let newarray = [...arr];
    if (sort === "off") {
      newarray.sort((a, b) => a.id - b.id);
    } else if (sort === "low-high") {
      newarray.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      newarray.sort((a, b) => b.price - a.price);
    }
    return newarray;
  };
  const options = categories.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <div className="app-root">
      <Select
        className="select"
        value={selectedCategories.map((category) => ({
          value: category,
          label: category,
        }))}
        options={options}
        isMulti
        onChange={(value) => {
          setCategories(
            value.map((value) => {
              return value.label;
            })
          );
        }}
      />
      <Link to="/form">Add Food</Link>
      <Input label="search" onChange={searchbar} />
      <Button
        text={
          sort === "off"
            ? "sort : off"
            : sort === "low-high"
            ? "sort : low-high"
            : "sort : high-low"
        }
        onClick={() => {
          setsort(
            sort === "off"
              ? "low-high"
              : sort === "low-high"
              ? "high-low"
              : "off"
          );
        }}
      />

      <div className="cards">
        {search.map((food, i) => {
          return (
            <Card
              food={food}
              key={i}
              addToCart={addToCart}
              deleteFood={deleteFood}
              editFood={(food) => {
                setFood(food);
                setEdit(true);
              }}
            />
          );
        })}
      </div>
      <div className="spinner hidden" ref={spinnerRef}>
        <div className="loader">Loading...</div>
      </div>
    </div>
  );
}

export default Products;
