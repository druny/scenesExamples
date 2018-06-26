import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { sellSkin, takeSkin } from "~/api/skins";
import { sendSuccessNotification, sendErrorNotification } from "~/actions/notifications";

import InventoryListView from "./Components/InventoryListView/InventoryListView";
import HeaderInventoryView from "./Components/HeaderInventoryView/HeaderInventoryView";

import AbsentDataBlock from "../../Components/AbsentDataBlock/AbsentDataBlock";

import styles from "./styles.scss";

const MAX_DISPLAYING = 4;
const SELL_SKIN = "SELL";

class Inventory extends React.Component {
  static propTypes = {
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onUpdateInventory: PropTypes.func.isRequired,
    user: PropTypes.objectOf(PropTypes.any).isRequired,
    inventory: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    filterSkinAppValue: null,
    isClickedDisplaying: true,
    maxDisplaying: MAX_DISPLAYING,
    filteredBySkinApp: [],
  };

  componentWillMount() {
    const { inventory } = this.props;
    const { filterSkinAppValue } = this.state;

    const sortedInventory = _.sortBy(inventory, (loot) => (-new Date(loot.createdAt).getTime()));
    const filteredBySkinApp = _.filter(sortedInventory, ({ Case: { skinApp } }) => !filterSkinAppValue || skinApp === filterSkinAppValue);

    this.setState({ filteredBySkinApp })
  }

  onShowAll = () => {
    const { filteredBySkinApp, isClickedDisplaying } = this.state;

    // eslint-disable-next-line
    isClickedDisplaying
      ? this.setState({ maxDisplaying: filteredBySkinApp.length })
      : this.setState({ maxDisplaying: MAX_DISPLAYING });

    return this.setState({ isClickedDisplaying: !isClickedDisplaying });
  };

  onSellAllSkins = async () => {
    const { inventory } = this.props;

    // eslint-disable-next-line
    for (const game of inventory) {
      if (!game.rewardAction) {
        // eslint-disable-next-line
        await this.onRewardSkin(game, SELL_SKIN);
      }
    }
  };

  onRewardSkin = async (currentGame, rewardAction) => {
    const { user, onError, onSuccess, onUpdateInventory } = this.props;
    const { id: gameId } = currentGame;

    const isSellSkin = rewardAction === SELL_SKIN;

    try {
      const { data: game } = isSellSkin
        ? await sellSkin({ gameId, userId: user.id })
        : await takeSkin({ gameId, userId: user.id });

      await onUpdateInventory(game);

      return onSuccess({
        message: isSellSkin
          ? "Your new funds are now available to use in your HexTech Wallet"
          : "We are now processing your trade request. You can view the trade offer status in your Skins Inventory."
      });
    } catch ({ message, response }) {
      return onError({
        message: response
          ? response.data.error
          : message
      })
    }
  };

  onFilterByAppValue = ({ target: { value } }) => {
    const filterSkinAppValue = value === "ALL"
      ? null
      : value;

    this.setState({ filterSkinAppValue });
  };

  render() {
    const {
      user,
      inventory,
    } = this.props;
    const {
      maxDisplaying,
      filterSkinAppValue,
      isClickedDisplaying,
    } = this.state;

    const sortedInventory = _.sortBy(inventory, (loot) => (-new Date(loot.createdAt).getTime()));
    const filteredBySkinApp = _.filter(sortedInventory, ({ Case: { skinApp } }) => !filterSkinAppValue || skinApp === filterSkinAppValue);

    const filteredBySkinAppLength = filteredBySkinApp.length;
    const inventoryListLength = maxDisplaying > filteredBySkinAppLength
      ? filteredBySkinAppLength
      : maxDisplaying;

    return (
      !inventory.length
        ? <AbsentDataBlock />
        : (
          <div className={styles.mainView}>
            <div className={styles.inventoryExist}>
              <HeaderInventoryView
                inventory={inventory}
                onShowAll={this.onShowAll}
                onSellAllSkins={this.onSellAllSkins}
                inventoryListLength={inventoryListLength}
                isClickedDisplaying={isClickedDisplaying}
                filteredBySkinAppLength={filteredBySkinAppLength}
              />
              <InventoryListView
                user={user}
                maxDisplaying={maxDisplaying}
                onRewardSkin={this.onRewardSkin}
                filteredBySkinApp={filteredBySkinApp}
              />
            </div>
          </div>
        )
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = ({
  onError: sendErrorNotification,
  onSuccess: sendSuccessNotification,
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
