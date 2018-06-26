import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Logo from "~/images/SimpleLogo@2x.png";

import icons from "~/styles/icons.scss";

import styles from "./styles.scss";

const AppBar = ({ onClick }) => (
  <div className={styles.mainView}>
    <button
      onClick={onClick}
      className={styles.buttonView}
    >
      <icon className={icons.menu} />
      <p className={styles.titleView}>Menu</p>
    </button>
    <Link
      to="/"
      href="/"
    >
      <img
        alt="logo"
        src={Logo}
        className={styles.logoView}
      />
    </Link>
  </div>
);

AppBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AppBar;
