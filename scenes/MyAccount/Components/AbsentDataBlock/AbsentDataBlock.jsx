import React from "react";
import PropsTypes from "prop-types";

import styles from "./styles.scss";


const AbsentDataBlock = ({ text }) => (
  <div className={styles.mainView}>
    <p className={styles.contentView}>{text}</p>
  </div>
);

AbsentDataBlock.propTypes = {
  text: PropsTypes.string,
};

AbsentDataBlock.defaultProps = {
  text: "Your Inventory is empty",
};

export default AbsentDataBlock;
