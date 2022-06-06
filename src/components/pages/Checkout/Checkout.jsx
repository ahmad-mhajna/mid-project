import Button from "../../Button/Button";
import CheckoutCard from "./CheckoutCard/CheckoutCard";
import "./Checkout.css";
function Checkout({ cart, addToCart }) {
  let sum = 0;
  cart.forEach((item) => {
    sum += item.price * item.quantity;
  });
  return (
    <div className="checkout">
      <div className="card-container">
        {cart.map((food, i) => {
          return (
            <CheckoutCard
              addToCart={addToCart}
              cart={cart}
              food={food}
              key={i}
            />
          );
        })}
      </div>
      <div className="pay">
        total :{sum}
        <Button
          text="buy"
          onClick={() => {
            addToCart([]);
          }}
        />
      </div>
    </div>
  );
}
export default Checkout;
