import "./style.css";
import HomePage from "./components/pages/Homepage/HomePage";
import Card from "./components/Card/Card";
import { Route, Link, useHistory, Router } from "react-router-dom";
import apiInstance from "./api/api";
import { useEffect, useRef, useState } from "react";
import Form from "./components/Form/Form";
import {} from "react-router-dom";
import Input from "./components/input/Input";
import Button from "./components/Button/Button";
import Products from "./components/pages/Products/Products";
function App() {
  const initalFood = {
    name: "",
    isVegan: false,
    ingredients: [],
    price: 0,
    img: "",
  };
  let History = useHistory();
  const spinnerRef = useRef();
  const [data, setData] = useState([]);
  const [food, setFood] = useState(initalFood);
  const [search, filterFood] = useState(data);
  const [isEdit, setEdit] = useState(false);
  const [sort, setsort] = useState("off");
  const [isVegan, setvegan] = useState("off");
  const [keywords, setKeywords] = useState("");

  const getData = async () => {
    spinnerRef.current.classList.remove("hidden");
    try {
      const response = await apiInstance.get("");
      setData(response.data);
      filterFood(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      spinnerRef.current.classList.add("hidden");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const editFood = async () => {
    spinnerRef.current.classList.remove("hidden");
    try {
      await apiInstance.put(`/${food.id}`, food);
      getData();
      setFood(initalFood);
      setEdit(false);
    } catch (e) {
      console.error(e);
    } finally {
      spinnerRef.current.classList.add("hidden");
    }
  };

  const addFood = async () => {
    spinnerRef.current.classList.remove("hidden");
    try {
      await apiInstance.post("", food);
      setFood(initalFood);
      getData();
    } catch (e) {
      console.error(e);
    } finally {
      spinnerRef.current.classList.add("hidden");
    }
  };
  useEffect(() => {
    let newArray = [...data];
    newArray = sortByPrice(newArray);
    newArray = isItVegan(newArray);
    newArray = newArray.filter((food) => food.name.includes(keywords));
    filterFood(newArray);
  }, [sort, isVegan, keywords]);
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
    if (isVegan === "off") {
      newarray = arr.filter((food) => !food.isVegan);
    } else if (isVegan === "on") {
      newarray = arr.filter((food) => food.isVegan);
    } else if (isVegan === "notVegan") {
      return arr;
    }
    return newarray;
  };
  const deleteFood = async (event) => {
    spinnerRef.current.classList.remove("hidden");
    try {
      await apiInstance.delete(`/${event.target.getAttribute("data-id")}`);
      getData();
    } catch (error) {
      console.error(error);
    } finally {
      spinnerRef.current.classList.add("hidden");
    }
  };
  return (
    <div className="app-root">
      <Router history={History}>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/products" exact>
          <Products />
        </Route>
        <div className="spinner hidden" ref={spinnerRef}>
          <div className="loader">Loading...</div>
        </div>
      </Router>
    </div>
  );
}

export default App;
