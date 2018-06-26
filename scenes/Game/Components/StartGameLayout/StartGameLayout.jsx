import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./styles.scss";

const PAID_MODE = "PAID";
const DEMO_MODE = "DEMO";

const payButtonClasses = classNames(styles.buttonView, styles.payButtonView);
const demoButtonClasses = classNames(styles.buttonView, styles.demoButtonView);

const StartGameLayout = (props) => {
  const { onStart, isBonusGame } = props;

  return (
    <div className={styles.mainView}>
      <button
        type="dedicate"
        onClick={() => onStart(PAID_MODE)}
      >
        <div className={payButtonClasses}>
          <p>Start game</p>
        </div>
      </button>
      <React.Fragment>
        {
          !isBonusGame &&
          <button
            type="murky"
            onClick={() => onStart(DEMO_MODE)}
          >
            <div className={demoButtonClasses}>
              <p>Demo Mode</p>
            </div>
          </button>
        }
      </React.Fragment>
    </div>
  );
};

StartGameLayout.propTypes = {
  onStart: PropTypes.func.isRequired,
  isBonusGame: PropTypes.bool.isRequired,
};

export default StartGameLayout;
