import "./style.css";
import Card from "./components/Card/Card";
import { Route, Link, useHistory, Router } from "react-router-dom";
import apiInstance from "./api/api";
import { useEffect, useRef, useState } from "react";
import Form from "./components/Form/Form";
import {} from "react-router-dom";
import Input from "./components/input/Input";
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
  const searchbar = (event) => {
    const input = event.target.value;
    const newSearch = data.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    filterFood(newSearch);
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
          <Link to="/form">Add Food</Link>
          <Input onChange={searchbar} />
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
        </Route>
        <Route path="/form">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              History.push("/");
              if (!isEdit) addFood();
              else editFood();
            }}
            food={food}
            setFood={setFood}
            isEdit={isEdit}
          />
        </Route>
        <div className="spinner hidden" ref={spinnerRef}>
          <div className="loader">Loading...</div>
        </div>
      </Router>
    </div>
  );
}

export default App;
