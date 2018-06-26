import React from "react";
import { Link } from "react-router-dom";

import SideNavLogo from "./SideNav@2x.png";

export default () => (
  <Link to="/" href="/">
    <img src={SideNavLogo} alt="side-nav-logo" />
  </Link>
);
