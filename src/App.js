import "./style.css";
import HomePage from "./components/pages/Homepage/HomePage";
import { Route, useHistory, Router } from "react-router-dom";
import apiInstance from "./api/api";
import { useEffect, useRef, useState } from "react";
import Form from "./components/Form/Form";
import Products from "./components/pages/Products/Products";
import Navbar from "./components/Navbar/Navbar";
function App() {
  const initalFood = {
    name: "",
    isVegan: false,
    ingredients: [],
    price: 0,
    img: "",
    categories: [],
  };
  let History = useHistory();
  const spinnerRef = useRef();
  const [data, setData] = useState([]);
  const [food, setFood] = useState(initalFood);
  const [isEdit, setEdit] = useState(false);
  const [startCategory, setCategory] = useState("");

  const getData = async () => {
    spinnerRef.current.classList.remove("hidden");
    try {
      const response = await apiInstance.get("");
      setData(response.data);
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
  const onSelect = (name) => {
    setCategory(name);
  };
  return (
    <div className="app-root">
      <Router history={History}>
        <Navbar />
        <Route path="/" exact>
          <HomePage onSelect={onSelect} />
        </Route>
        <Route path="/products" exact>
          <Products
            data={data}
            setFood={setFood}
            deleteFood={deleteFood}
            setEdit={setEdit}
            category={startCategory}
          />
        </Route>
        <div className="spinner hidden" ref={spinnerRef}>
          <div className="loader">Loading...</div>
        </div>
        <Route path="/form">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              History.push("/products");
              if (!isEdit) addFood();
              else editFood();
            }}
            food={food}
            setFood={setFood}
            isEdit={isEdit}
          />
        </Route>
      </Router>
    </div>
  );
}

export default App;
