import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MainButton from "~/components/Buttons/MainButton/MainButton"
import icons from "~/styles/icons.scss";

import styles from "./styles.scss";

const iconClassName = classNames(icons.steam, styles.buttonImageDefault);

const SignInButtonSteam = ({ onClick }) => (
  <MainButton
    type="dedicate"
    onClick={onClick}
    className={styles.mainView}
  >
    <div className={styles.buttonContent}>
      <icon className={iconClassName} />
      <p className={styles.buttonText}>Sign In</p>
    </div>
  </MainButton>
);

SignInButtonSteam.propTypes = {
  onClick: PropTypes.func,
};

SignInButtonSteam.defaultProps = {
  onClick: () => ({})
};

export default SignInButtonSteam;
