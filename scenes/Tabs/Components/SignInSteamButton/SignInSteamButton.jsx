import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MainButton from "~/components/Buttons/MainButton/MainButton";

import icons from "~/styles/icons.scss";

import styles from "./styles.scss";

const iconClassName = classNames(icons.steam, styles.imageView);

const content = { buttonTitle: "SIGN IN VIA STEAM" };

const SignInSteamButton = ({ onClick }) => (
  <MainButton
    type="highlight"
    onClick={onClick}
  >
    <div className={styles.mainView}>
      <icon className={iconClassName} />
      <p className={styles.textView}>{content.buttonTitle}</p>
    </div>
  </MainButton>
);

SignInSteamButton.propTypes = {
  onClick: PropTypes.func,
};

SignInSteamButton.defaultProps = {
  onClick: () => ({}),
};

export default SignInSteamButton;
