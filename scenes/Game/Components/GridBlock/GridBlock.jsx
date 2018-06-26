import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import GridBlockRevealed from "./Components/GridBlockRevealed";
import GridBlockDefault from "./Components/GridBlockDefault";

import styles from "./styles.scss";

const activeClass = classNames(styles.cardWrapper, styles.active);
const nonActiveClass = classNames(styles.cardWrapper, styles["non-active"]);

class GridBlock extends React.Component {
  static propTypes = {
    skin: PropTypes.objectOf(PropTypes.any),
    skins: PropTypes.arrayOf(PropTypes.any),
    onClick: PropTypes.func.isRequired,
    blockIndex: PropTypes.number.isRequired,
    isRevealedGame: PropTypes.bool.isRequired,
    isRevealedBlock: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    skin: {},
    skins: {},
  };

  onMouseOver = (e) => console.log("[e]", e.clientX);

  render() {
    const {
      skin,
      skins,
      onClick,
      blockIndex,
      isRevealedGame,
      isRevealedBlock,
    } = this.props;

    const mainStyles = isRevealedBlock
      ? activeClass
      : nonActiveClass;
    const layoutStyles = styles.layoutViewDefault;

    return (
      <li
        className={mainStyles}
      >
        <button className={layoutStyles} onClick={this.onMouseOver} />
        {
          isRevealedGame
            ? (
              <GridBlockRevealed
                skin={skin}
                skins={skins}
                blockIndex={blockIndex}
                isRevealedBlock={isRevealedBlock}
              />
            )
            : (
              <GridBlockDefault
                onClick={onClick}
                blockIndex={blockIndex}
              />
            )
        }
      </li>
    );
  }
}

export default GridBlock;
