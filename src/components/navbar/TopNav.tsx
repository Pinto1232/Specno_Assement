import { Link } from "@nextui-org/react";
import "./Navbar.css";

const TopNav = () => {
  return (
    <div className="nav-top-bg">
      <Link className="txtColor" href="#">
        Learn how to build your first digital product
      </Link>
    </div>
  );
};

export default TopNav;
