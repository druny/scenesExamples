import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { getSkinGradeColor } from "~/utils/skins";

import HoverRevealedBlockView from "./HoverRevealedBlockView";

import styles from "../styles.scss";

const wonBlockStyles = classNames(styles["price-cell"], styles.won);
const cardFaceBackStyles = classNames(styles.cardFace, styles.back);
const rarityCellStyles = classNames(styles.tl2, styles["rarity-cell"]);

class GridBlockRevealed extends React.Component {
  static propTypes = {
    blockIndex: PropTypes.number.isRequired,
    isRevealedBlock: PropTypes.bool.isRequired,
    skins: PropTypes.arrayOf(PropTypes.any).isRequired,
    skin: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  state = {
    isDisplayHover: false,
  };

  onEnter = () => this.setState({ isDisplayHover: true });

  onLeave = () => this.setState({ isDisplayHover: false });

  render() {
    const { isDisplayHover } = this.state;
    const { skin, skins, blockIndex, isRevealedBlock } = this.props;
    const {
      skinId,
      valueUSD,
      skinImageUrl,
      skinExterior = "",
    } = skin;

    const exteriorInitials = skinExterior.split(/\w(-|\s)/)
      .map((word) => (word[0] !== "-" && word[0] !== " ") ? word[0] : null)
      .join("")
      .toUpperCase();

    const skinData = skins.filter(({ id }) => skinId === id)[0];
    const gradeColor = getSkinGradeColor(skinData.grade);

    const priceStyles = isRevealedBlock
      ? wonBlockStyles
      : styles["price-cell"];

    return (
      <React.Fragment>
        {
          isDisplayHover &&
          <HoverRevealedBlockView
            skinId={skinId}
            skinData={skinData}
            skinExterior={skinExterior}
          />
        }
        <div
          data-tip=""
          data-for={skinId}
          onMouseEnter={this.onEnter}
          onMouseLeave={this.onLeave}
          className={styles.card}
        >
          <div className={cardFaceBackStyles}>
            <div>
              <img
                alt="imageSource"
                src={skinImageUrl}
              />
              <span className={styles["number-cell"]}>{blockIndex + 1}</span>
              <span
                style={{ backgroundColor: gradeColor }}
                className={rarityCellStyles}
              />
              <span className={styles["exterior-cell"]}>{exteriorInitials}</span>
              <span className={priceStyles}>${valueUSD.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GridBlockRevealed;
