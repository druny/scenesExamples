import React from "react";
import classNames from "classnames";

import styles from "./styles.scss";

const description = "In order to open free case Steam account connected to your HexTech account must own CS:GO or PUBG and be set to public.";

const leftBlock = classNames(styles.borderView, styles.leftBorderView);
const rightBlock = classNames(styles.borderView, styles.rightBorderView);

const InfoBlock = () => (
  <div className={styles.mainView}>
    <div className={leftBlock} />
    <p className={styles.descriptionView}>{description}</p>
    <div className={rightBlock} />
  </div>
);

export default InfoBlock;
