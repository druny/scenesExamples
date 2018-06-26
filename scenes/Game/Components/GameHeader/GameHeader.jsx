import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MainButton from "~/components/Buttons/MainButton/MainButton";

import { toggleFairPlayVerificationModal } from "~/actions/modals";

import icons from "~/styles/icons.scss";
import styles from "./styles.scss";

const GameHeader = (props) => {
  const {
    name,
    price,
    isBonusGame,
    currentGame,
    onPlayAgain,
    toggleFairPlayVerificationModal: onToggle,
  } = props;

  const totalAmount = `$${price.toFixed(2)}`;

  const hashMap = currentGame.hashGrid
    ? currentGame.hashGrid.map((hash, index) => ({ hash, index: index + 1 }))
    : [];
  const gridMap = currentGame.gridMap
    ? currentGame.gridMap.map(
      (
        {
          cellIndex,
          skinTitle,
          skinModel,
          skinExterior,
        },
        index
      ) => {
        const revealed = skinModel && skinExterior
          ? `${cellIndex + 1} + ${skinTitle} | ${skinModel} (${skinExterior})`
          : `${cellIndex + 1} + ${skinTitle}`;

        return {
          revealed,
          index: index + 1,
        }
      })
      : [];

  const fairPlayObject = { hashMap, gridMap, serverSeed: currentGame.serverSeed };
  let title = "";

  if (isBonusGame) {
    title = <p>Bonus</p>;
  } else if (currentGame.mode === "DEMO") {
    title = <p>Demo mode</p>;
  } else {
    title = <p>Opening price <span>{totalAmount}</span></p>;
  }


  return (
    <div className={styles.mainView}>
      <div className={styles.leftView}>
        <button
          onClick={() => onToggle(true, fairPlayObject)}
          className={styles.fairView}
        >
          <icon className={icons.provablyfair} />
        </button>
        <p className={styles.nameView}>{name}</p>
      </div>
      <div className={styles.descriptionView}>{title}</div>
      <div className={styles.rightPart}>
        <div className={styles.rightPartContent}>
          {
            currentGame.gridMap && !isBonusGame &&
            (
              <div className={styles.buttonView}>
                <MainButton
                  type="highlight"
                  onClick={onPlayAgain}
                >
                  <div className={styles.buttonContent}>
                    <p>Play Again</p>
                  </div>
                </MainButton>
              </div>
            ) || ""
          }
        </div>
      </div>
    </div>
  )
};

GameHeader.propTypes = {
  isBonusGame: PropTypes.bool,
  currentGame: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  toggleFairPlayVerificationModal: PropTypes.func.isRequired,
};

GameHeader.defaultProps = {
  currentGame: {},
  isBonusGame: false,
};

const mapDispatchToProps = ({ toggleFairPlayVerificationModal });

export default connect(() => ({}), mapDispatchToProps)(GameHeader);
