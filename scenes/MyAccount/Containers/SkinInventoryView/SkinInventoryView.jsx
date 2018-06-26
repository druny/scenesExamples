import React from "react";
import PropTypes from "prop-types";

import Loader from "~/components/Loaders/Loader";
import MainButton from "~/components/Buttons/MainButton/MainButton";

import { getFinishedPolyCaseGame } from "~/api/polyCase";

import { getColorByLootLevel } from "./utils/loots";
import TakeOverlayView from "./Components/TakeOverlayView/TakeOverlayView";

import styles from "./styles.scss";

const TAKE_ACTION = "TAKE";

class SkinInventoryView extends React.Component {
  static propTypes = {
    skinImageUrl: PropTypes.string.isRequired,
    onTake: PropTypes.func.isRequired,
    onSell: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    valueUSD: PropTypes.number.isRequired,
    skinModel: PropTypes.string.isRequired,
    skinTitle: PropTypes.string.isRequired,
    skinExterior: PropTypes.string.isRequired,
    gridGame: PropTypes.oneOfType([PropTypes.any]).isRequired,
  };

  state = {
    isOpenOverlay: false,
    fetchedLoot: {},
    isFetchingLoot: false,
  };

  onTake = async () => {
    await this.props.onTake();
    await this.updateLootInfoIfEmpty();
  };

  onToggleOverlay = async () => {
    if (!this.state.fetchedLoot) {
      await this.updateLootInfoIfEmpty();
    }

    this.setState({ isOpenOverlay: !this.state.isOpenOverlay });
  };

  updateLootInfoIfEmpty = async () => {
    const { gridGame, userId } = this.props;
    const { Loot } = gridGame;

    if (!Loot || !Loot.statusMessage) {
      this.setState({ isFetchingLoot: true });

      const { data: game } = await getFinishedPolyCaseGame(userId, gridGame.id);

      this.setState({ fetchedLoot: game.Loot, isFetchingLoot: false });
    }
  };

  render() {
    const {
      onSell,
      gridGame,
      valueUSD,
      skinModel,
      skinTitle,
      skinImageUrl,
      skinExterior,
    } = this.props;
    const { isFetchingLoot, fetchedLoot, isOpenOverlay } = this.state;

    const { Loot, rewardAction } = gridGame;
    const isTake = rewardAction === TAKE_ACTION;
    const loot = Loot && Loot.statusMessage.level
      ? Loot
      : fetchedLoot;

    return (
      <div className={styles.mainView}>
        <img
          className={styles.imageView}
          src={skinImageUrl}
          alt="skin"
        />
        <div className={styles.titleView}>
          <p>{skinTitle}</p>
          <p>|</p>
          <p>{skinModel}</p>
        </div>
        <p className={styles.exteriorView}>{skinExterior}</p>
        {
          isTake && loot && loot.statusMessage
            ? (
              <Loader
                loaded={!isFetchingLoot}
                styles={{ margin: "20px auto" }}
              >
                <div className={styles.tradeButtonView}>
                  <MainButton
                    type="murky"
                    onClick={this.onToggleOverlay}
                    style={{
                      backgroundColor: getColorByLootLevel(loot.statusMessage.level),
                      opacity: ".9",
                    }}
                  >
                    <p className={styles.sellButtonContentViewImportant}>See trade status</p>
                  </MainButton>
                </div>
                <TakeOverlayView
                  loot={loot}
                  isOpenOverlay={isOpenOverlay}
                  onClose={this.onToggleOverlay}
                />
              </Loader>
            )
            : (
              <React.Fragment>
                <div className={styles.sellButtonView}>
                  <MainButton
                    type="murky"
                    onClick={onSell}
                  >
                    <p className={styles.sellButtonContentViewImportant}>Sell for ${valueUSD.toFixed(2)}</p>
                  </MainButton>
                </div>
                <div className={styles.takeButtonView}>
                  <MainButton
                    type="murky"
                    onClick={this.onTake}
                  >
                    <p className={styles.takeButtonContentView}>Take</p>
                  </MainButton>
                </div>
              </React.Fragment>
            )
        }
      </div>
    );
  }
}


export default SkinInventoryView;
