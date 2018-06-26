import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./styles.scss";

const borderLeftTopStyles = classNames(styles.borderContainer, styles.borderLeftTop);
const borderLeftBottomStyles = classNames(styles.borderContainer, styles.borderLeftBottom);
const borderRightTopTopStyles = classNames(styles.borderContainer, styles.borderRightTop);
const borderRightBottomStyles = classNames(styles.borderContainer, styles.borderRightBottom);

const CasesOpened = ({ count }) => (
  <div className={styles.mainView}>
    <h2 className={styles.titleView}>Cases Opened</h2>
    <p className={styles.countView}>{count}</p>
    <div className={borderLeftTopStyles} />
    <div className={borderLeftBottomStyles} />
    <div className={borderRightTopTopStyles} />
    <div className={borderRightBottomStyles} />
  </div>
);

CasesOpened.propTypes = {
  count: PropTypes.number,
};

CasesOpened.defaultProps = {
  count: 0,
};

export default CasesOpened;
