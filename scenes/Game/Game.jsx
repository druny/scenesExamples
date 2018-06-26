import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";


import CasesList from "./Scenes/CasesList/CasesList";
import PolyCase from "./Scenes/PolyCase/PolyCase";

import { POLY_CASE, SKIN_RAID, JUNGLE_RUN } from "./GameTypes";

const Games = {
  [POLY_CASE]: PolyCase,
  [SKIN_RAID]: (<h1>Skin Raid</h1>),
  [JUNGLE_RUN]: (<h1>Jungle Run</h1>),
};

const Game = ({ gameMode, path }) => (
  <div>
    <Route
      exact
      path={`/${path}`}
      component={() => <CasesList gameMode={gameMode} />}
    />
    <Route
      exact
      path={`/${gameMode}/:id`}
      component={Games[gameMode]}
    />
  </div>
);

Game.propTypes = ({
  path: PropTypes.string.isRequired,
  gameMode: PropTypes.string.isRequired,
});

export default Game;
