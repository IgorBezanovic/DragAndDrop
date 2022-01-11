import React from "react";
import { Link } from "react-router-dom";

const NavButton = ({ routeTo, icon }: { routeTo: string; icon: string }) => (
  <Link className="link" to={routeTo}>
    <button className="header-button">
      <img className="header-icons" src={icon} alt="dumbbell" />
    </button>
  </Link>
);

export default NavButton;
