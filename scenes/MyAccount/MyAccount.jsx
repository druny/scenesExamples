import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { sendSuccessNotification, sendErrorNotification } from "~/actions/notifications";

import AuthProcessing from "~/scenes/AuthProcessing/AuthProcessing";
import Loader from "~/components/Loaders/Loader";
import ContentWrapper from "~/components/ContentWrapper/ContentWrapper";

import {
  updateUserInfo,
  getUserBalance,
  getUserInventory,
} from "~/actions/user";

import History from "./Scenes/History/History";
import Header from "./Containers/Header/Header";
import Inventory from "./Containers/Inventory/Inventory";
import TradeLinkView from "./Containers/TradeLinkView/TradeLinkView";
import CasesOpened from "./Components/CasesOpened/CasesOpened";

import styles from "./styles.scss";

class MyAccount extends React.Component {
  static propTypes = {
    inventory: PropTypes.arrayOf(PropTypes.any),
    updateUserInfo: PropTypes.func.isRequired,
    getUserBalance: PropTypes.func.isRequired,
    getUserInventory: PropTypes.func.isRequired,
    sendErrorNotification: PropTypes.func.isRequired,
    user: PropTypes.objectOf(PropTypes.any).isRequired,
    sendSuccessNotification: PropTypes.func.isRequired,
  };

  static defaultProps = {
    inventory: []
  };

  state = {
    isLoader: true,
    filteredInventory: [],
    isTradeLinkViewDisplayed: false,
  };

  async componentWillMount() {
    await this.onUpdateInventory();
  }

  onUpdateUserInfo = (user) => {
    this.props.updateUserInfo(user);

    this.onChangeTradeUrlButton();
  };

  onChangeTradeUrlButton = () => {
    const { isTradeLinkViewDisplayed } = this.state;

    this.setState(({ isTradeLinkViewDisplayed: !isTradeLinkViewDisplayed }))
  };

  onUpdateInventory = () => {
    const { id: userId } = this.props.user;

    this.props.getUserInventory(userId);

    this.props.getUserBalance(userId);
  };

  onUpdateInventoryWithoutLoader = (game) => {
    const { id: userId } = this.props.user;
    const inventory = !this.state.filteredInventory.length
      ? this.props.inventory
      : this.state.filteredInventory;

    this.props.getUserBalance(userId);

    const filteredInventory = _.remove([...inventory], ({ id }) => id !== game.id);
    const additionalFilteredInventory = [...filteredInventory, game];

    return this.setState({ filteredInventory: additionalFilteredInventory });
  };

  render() {
    const {
      user,
      inventory,
      sendErrorNotification: onError,
      sendSuccessNotification: onSuccess,
    } = this.props;
    const {
      isLoader,
      filteredInventory,
      isTradeLinkViewDisplayed,
    } = this.state;

    const filteredInventoryList = (
      !filteredInventory.length
        ? inventory
        : filteredInventory
    ).filter(({ rewardAction }) => !rewardAction || rewardAction === "TAKE");

    return (
      <div className={styles.mainView}>
        <Loader
          style={{ minHeight: "calc(75vh - 60px)" }}
          loaded={!user.isFetchingInventory && isLoader}
        >
          <AuthProcessing>
            <Header
              user={user}
              onChangeTradeUrlButton={this.onChangeTradeUrlButton}
            />
          </AuthProcessing>
          <React.Fragment>
            {
              isTradeLinkViewDisplayed && (
                <div className={styles.tradeLinkView}>
                  <TradeLinkView
                    user={user}
                    onError={onError}
                    onSuccess={onSuccess}
                    onUpdateUserInfo={this.onUpdateUserInfo}
                  />
                </div>
              )
            }
          </React.Fragment>
          <ContentWrapper>
            <div className={styles.contentView}>
              <div className={styles.casesOpenedView}>
                <CasesOpened count={inventory.length} />
              </div>
              <div className={styles.inventoryView}>
                <Inventory
                  userId={user.id}
                  inventory={filteredInventoryList}
                  onUpdateInventory={this.onUpdateInventoryWithoutLoader}
                />
              </div>
              <History />
            </div>
          </ContentWrapper>
        </Loader>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user, inventory: user.inventory, });
const mapDispatchToProps = ({
  getUserBalance,
  updateUserInfo,
  getUserInventory,
  sendErrorNotification,
  sendSuccessNotification,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
