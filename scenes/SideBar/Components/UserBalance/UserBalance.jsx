import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import icons from "~/styles/icons.scss";

import styles from "./styles.scss";

const addDepositIconStyles = classNames(icons.adddeposit, styles.imageView);

const UserBalance = ({ balance, onClick }) => (
  <React.Fragment>
    <button
      className={styles.mainView}
      onClick={onClick}
    >
      <p className={styles.textView}>{`$ ${balance.toFixed(2)}`}</p>
      <icon className={addDepositIconStyles} />
    </button>
  </React.Fragment>
);

UserBalance.propTypes = {
  onClick: PropTypes.func,
  balance: PropTypes.number,
};

UserBalance.defaultProps = {
  balance: 0.00,
  onClick: () => ({}),
};

export default UserBalance;
