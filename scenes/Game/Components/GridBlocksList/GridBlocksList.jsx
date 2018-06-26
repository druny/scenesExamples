/* eslint-disable */
import React from "react";
import classNames from "classnames";

import GridBlock from "../GridBlock/GridBlock";

import styles from "../GridBlock/styles.scss";

export default class GridBlocksList extends React.Component {
  render() {
    const {
      Case,
      skins,
      onReveal,
      isRevealed,
      currentGame,
      revealedBlockIndex,
      isWonLayoutDisplaying,
    } = this.props;

    const mappedGrid = [];
    const hasKeys = currentGame.gridMap;
    const gridSqrt = Math.sqrt(Case.length);

    const layoutStyles = !isWonLayoutDisplaying
      ? styles.layoutViewDefault
      : classNames(styles.layoutViewDefault, styles.layoutViewRevealed);
    const gameFieldStyles = classNames(styles["game-field"], styles[`g${gridSqrt}x${gridSqrt}`]);

    for (let i = 0; i < Case.length; i += 1) {
      mappedGrid.push(
        <GridBlock
          key={i}
          skin={
            hasKeys
              ? currentGame.gridMap[i]
              : currentGame
          }
          skins={skins}
          blockIndex={i}
          length={Case.length}
          onClick={() => {
            const sqrt = Math.sqrt(Case.length);

            const fromTopScrollOpts = { behavior: "smooth", block: "center", inline: "start"};
            const fromMiddleScrollOpts = { behavior: "smooth", block: "center", inline: "center"};
            const fromBottomScrollOpts = { behavior: "smooth", block: "center", inline: "end"};

            let mainOpts = fromTopScrollOpts;

            if (sqrt * (sqrt / 2) <= i + 1 && sqrt * (sqrt / 2) + sqrt * 2 >= i + 1) {
              mainOpts = fromMiddleScrollOpts;
            } else if (sqrt * (sqrt / 2) <= i + 1) {
              mainOpts = fromBottomScrollOpts;
            }

            this.mainElement.scrollIntoView(mainOpts);

            return onReveal(i);
          }}
          isRevealedGame={isRevealed}
          isRevealedBlock={revealedBlockIndex === i}
        />
      );
    }

    return (
      <div
        className={gameFieldStyles}
        ref={(mainElement) => this.mainElement = mainElement}
      >
        <ul>
          <button className={layoutStyles} />
          {mappedGrid}
        </ul>
      </div>
    );
  }
}
