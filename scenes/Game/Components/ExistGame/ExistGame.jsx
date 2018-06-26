import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import MainButton from "~/components/Buttons/MainButton/MainButton";

import styles from "./styles.scss";

const ExistGame = ({ existGame }) => (
  <React.Fragment>
    <h1 className={styles.titleView}>You already have an active paid game.</h1>
    <Link
      to={`/${existGame.type}/${existGame.caseId}`}
      href={`/${existGame.type}/${existGame.caseId}`}
    >
      <MainButton type="dedicate">
        <p>Finish game</p>
      </MainButton>
    </Link>
    <p className={styles.descriptionView}>
      Finish the game first before starting a new game.
    </p>
  </React.Fragment>
);

ExistGame.propTypes = {
  existGame: PropTypes.objectOf(PropTypes.any),
};

ExistGame.defaultProps = {
  existGame: {},
};

export default ExistGame;
