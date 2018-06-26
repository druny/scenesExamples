import React from "react";
import PropTypes from "prop-types";

import WonSkinView from "../../Components/WonSkinView/WonSkinView";
import StartGameLayout from "../../Components/StartGameLayout/StartGameLayout";
import GridBlocksList from "../../Components/GridBlocksList/GridBlocksList";

import styles from "./styles.scss";

const GridGame = (props) => {
  const {
    skins,
    Case,
    onSell,
    onStart,
    onReveal,
    isRevealed,
    isBonusGame,
    currentGame,
    onCloseWonLayout,
    revealedBlockIndex,
    isWonLayoutDisplaying,
  } = props;

  let wonSkins = [];

  if (revealedBlockIndex !== null) {
    wonSkins = skins.filter(({ id }) => currentGame.gridMap[revealedBlockIndex].skinId === id);
  }

  const gridSqrt = Math.sqrt(Case.length);

  const gridTemplateColumns = `repeat(${gridSqrt}, 1fr)`;
  const gridTemplateRows = `repeat(${gridSqrt}, 1fr)`;

  return (
    <div
      className={styles.mainView}
      style={{ gridTemplateRows, gridTemplateColumns }}
    >
      <GridBlocksList
        Case={Case}
        skins={skins}
        onReveal={onReveal}
        isRevealed={isRevealed}
        currentGame={currentGame}
        revealedBlockIndex={revealedBlockIndex}
        isWonLayoutDisplaying={wonSkins[0] && isWonLayoutDisplaying}
      />
      <React.Fragment>
        {
          !Object.keys(currentGame).length &&
          <StartGameLayout
            onStart={onStart}
            isBonusGame={isBonusGame}
          />
        }
      </React.Fragment>
      <React.Fragment>
        {
          wonSkins[0] &&
          isWonLayoutDisplaying &&
          (
            <WonSkinView
              {...wonSkins[0]}
              {...currentGame.gridMap[revealedBlockIndex]}
              onSell={onSell}
              casePrice={Case.price}
              mode={currentGame.mode}
              onClose={onCloseWonLayout}
              foregroundImageUrl={Case.foregroundImageUrl}
            />
          )
        }
      </React.Fragment>
    </div>
  );
};

GridGame.propTypes = {
  isBonusGame: PropTypes.bool,
  revealedBlockIndex: PropTypes.number,
  currentGame: PropTypes.objectOf(PropTypes.any),
  onSell: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onReveal: PropTypes.func.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  onCloseWonLayout: PropTypes.func.isRequired,
  isWonLayoutDisplaying: PropTypes.bool.isRequired,
  Case: PropTypes.objectOf(PropTypes.any).isRequired,
  skins: PropTypes.arrayOf(PropTypes.any).isRequired,
};

GridGame.defaultProps = {
  currentGame: {},
  isBonusGame: false,
  revealedBlockIndex: null,
};

export default GridGame;
