import HomeCard from "./Card/HomeCard";
import "./HomePage.css";

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
];
function HomePage() {
  return (
    <div>
      {categories.map((category) => {
        return (
          <HomeCard name={category} className={category.replace(" ", "")} />
        );
      })}
    </div>
  );
}
export default HomePage;
