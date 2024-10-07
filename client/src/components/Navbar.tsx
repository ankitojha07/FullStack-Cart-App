import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="flex flex-row justify-between mb-8">
      <Link to="/" className="w-6/12">
        <img src="" alt="Logo" />
      </Link>
      <nav className=" flex justify-end w-2/12">
        <ul className="flex justify-around w-full">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
