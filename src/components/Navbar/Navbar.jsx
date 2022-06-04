import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar({ currentPage }) {
  return (
    <nav>
      {currentPage !== "checkout" && <Link to="/checkout">Checkout</Link>}
      {currentPage !== "homepage" && <Link to="/">homepage</Link>}
      {currentPage !== "search" && <Link to="/products">search</Link>}
    </nav>
  );
}
export default Navbar;
