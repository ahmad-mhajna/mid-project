import "./Products.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {} from "react-router-dom";
import Button from "../../Button/Button";
import Input from "../../input/Input";
import Card from "../../Card/Card";
function Products({ data, deleteFood, setFood, setEdit }) {
  const spinnerRef = useRef();
  const [search, filterFood] = useState(data);
  const [sort, setsort] = useState("off");
  const [isVegan, setvegan] = useState("off");
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    let newArray = [...data];
    newArray = sortByPrice(newArray);
    newArray = isItVegan(newArray);
    newArray = newArray.filter((food) => food.name.includes(keywords));
    filterFood(newArray);
    // eslint-disable-next-line
  }, [sort, isVegan, keywords, data]);
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
  const isItVegan = (arr) => {
    let newarray = [];
    if (isVegan === "notVegan") {
      newarray = arr.filter((food) => !food.isVegan);
    } else if (isVegan === "on") {
      newarray = arr.filter((food) => food.isVegan);
    } else if (isVegan === "off") {
      return arr;
    }
    return newarray;
  };
  return (
    <div className="app-root">
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
      <Button
        text={
          isVegan === "off"
            ? "all"
            : isVegan === "on"
            ? "vegan : yes"
            : "vegan : not"
        }
        onClick={() => {
          setvegan(
            isVegan === "off" ? "on" : isVegan === "on" ? "notVegan" : "off"
          );
        }}
      />

      <div className="cards">
        {search.map((food, i) => {
          return (
            <Card
              food={food}
              key={i}
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
