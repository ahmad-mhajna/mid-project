import Button from "../../Button/Button";
import CheckoutCard from "./CheckoutCard/CheckoutCard";

function Checkout({ cart, addToCart }) {
  let sum = 0;
  cart.forEach((item) => {
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
        <Button
          text="pay"
          onClick={() => {
            addToCart([]);
          }}
        />
      </div>
    </div>
  );
}
export default Checkout;
