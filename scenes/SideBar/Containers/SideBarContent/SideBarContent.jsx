import React from "react";
import PropTypes from "prop-types";

import Logo from "../../Components/Logo/Logo";
import BonusButton from "../../Components/BonusButton/BonusButton";

import ContentMenuPublic from "../../Containers/ContentMenuPublic/ContentMenuPublic";
import ContentMenuPrivate from "../../Containers/ContentMenuPrivate/ContentMenuPrivate";

import styles from "./styles.scss";

const SideBarContent = ({ onClick, isAuthenticated }) => (
  <button
    onClick={onClick}
    className={styles.mainView}
  >
    <div className={styles.logoView}>
      <Logo />
    </div>
    <div className={styles.contentSideBarView}>
      {
        isAuthenticated
          ? <ContentMenuPrivate />
          : <ContentMenuPublic />
      }
    </div>
    <div className={styles.bonusesButtonView}>
      {
        isAuthenticated &&
        <BonusButton />
      }
    </div>
  </button>
);

SideBarContent.propTypes = {
  onClick: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default SideBarContent;
