import Button from "../../Button/Button";
import CheckoutCard from "./Checkout-Card/CheckoutCard";

function Checkout({ cart, addToCart }) {
  let sum = 0;
  cart.map((item) => {
    sum += item.price * item.quantity;
  });
  return (
    <div>
      {cart.map((food, i) => {
        return (
          <CheckoutCard addToCart={addToCart} cart={cart} food={food} key={i} />
        );
      })}
      <div>
        {sum}
        <Button text="pay" />
      </div>
    </div>
  );
}
export default Checkout;
