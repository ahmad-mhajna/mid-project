import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar({ currentPage }) {
  return (
    <nav>
      {currentPage !== "checkout" && <Link to="/checkout">Checkout</Link>}
      {currentPage !== "homepage" && <Link to="/">Home</Link>}
      {currentPage !== "products" && <Link to="/products">Products</Link>}
      {currentPage !== "login" && <Link to="/login">Login</Link>}
    </nav>
  );
}
export default Navbar;
