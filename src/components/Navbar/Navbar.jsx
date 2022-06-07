import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar({ currentPage }) {
  return (
    <nav>
      {currentPage !== "checkout" && <Link to="/checkout">Checkout</Link>}
      {currentPage !== "homepage" && <Link to="/">homepage</Link>}
      {currentPage !== "login" && <Link to="/products">products</Link>}
      {currentPage !== "login" && <Link to="/login">login</Link>}
    </nav>
  );
}
export default Navbar;
