import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MainButton from "~/components/Buttons/MainButton/MainButton";

import styles from "./styles.scss";

const mainHeaderStyles = classNames(styles.headerView, styles.mainHeaderView);

const HeaderInventoryView = (props) => {
  const {
    inventory,
    onShowAll,
    onSellAllSkins,
    inventoryListLength,
    isClickedDisplaying,
    filteredBySkinAppLength,
  } = props;

  const totalSum = inventory
    .filter(({ rewardAction }) => !rewardAction)
    .reduce((sum, currentValue) => (
      currentValue.revealedCell
        ? currentValue.revealedCell.valueUSD + sum
        : currentValue + sum
    ), 0).toFixed(2);

  return(
    <React.Fragment>
      <div className={mainHeaderStyles}>
        <div className={styles.leftView}>
          <h2 className={styles.titleView}>Skins inventory</h2>
        </div>
        <div className={styles.rightView}>
          {
            totalSum > 0 &&
            <div className={styles.sellAllButtonView}>
              <MainButton
                type="highlight"
                onClick={onSellAllSkins}
              >
                <p className={styles.sellAllButtonContentView}>
                  Sell all for ${totalSum}
                </p>
              </MainButton>
            </div>
          }
        </div>
      </div>
      <div className={styles.headerView}>
        <div className={styles.leftView}>
          <p className={styles.subTitleView}>Items you still need to take action on</p>
        </div>
        <div className={styles.rightView}>
          <p className={styles.showingInfoView}>
            Showing {inventoryListLength} of {filteredBySkinAppLength}
          </p>
          <div className={styles.showAllButtonView}>
            <MainButton
              type="murky"
              onClick={onShowAll}
              disabled={isClickedDisplaying && inventoryListLength === filteredBySkinAppLength}
            >
              <p className={styles.showAllButtonContentView}>
                Show
                <React.Fragment>
                  {
                    isClickedDisplaying
                      ? " all"
                      : " less"
                  }
                </React.Fragment>
              </p>
            </MainButton>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

HeaderInventoryView.propTypes = {
  onShowAll: PropTypes.func.isRequired,
  onSellAllSkins: PropTypes.func.isRequired,
  isClickedDisplaying: PropTypes.bool.isRequired,
  inventoryListLength: PropTypes.number.isRequired,
  filteredBySkinAppLength: PropTypes.number.isRequired,
  inventory: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HeaderInventoryView;
