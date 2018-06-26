import React from "react";
import PropTypes from "prop-types";

import MainButton from "~/components/Buttons/MainButton/MainButton";
import iconStyles from "~/styles/icons.scss";

import { lootStatuses, getColorByLootLevel } from "../../utils/loots";

import styles from "./styles.scss";

const tradeOffersLink = "//steamcommunity.com/my/tradeoffers";

const TakeOverlayView = ({ loot, onClose, isOpenOverlay }) => {
  const overlayStyles = isOpenOverlay
    ? { display: "block" }
    : { display: "none" };

  const { type, statusMessage, userTradeOfferId } = loot;
  const { title, message, level } = statusMessage;

  const { ACCEPT_USER_TRADE } = lootStatuses;
  const color = getColorByLootLevel(level);

  return (
    <div
      style={overlayStyles}
      className={styles.mainView}
    >
      <button
        onClick={onClose}
        className={styles.closeButtonView}
      >
        <icon className={iconStyles.close} />
      </button>
      <h2
        style={{ color }}
        className={styles.titleView}
      >
        {title}
      </h2>
      <p className={styles.messageView}>{message}</p>
      <React.Fragment>
        {
          userTradeOfferId &&
          <p className={styles.tradeOfferView}>{`ID: ${userTradeOfferId}`}</p>
        }
      </React.Fragment>
      <React.Fragment>
        {
          (type === ACCEPT_USER_TRADE) &&
          <a
            target="_blank"
            href={tradeOffersLink}
            className={styles.tradeOfferLink}
          >
            <MainButton type="murky">
              <p className={styles.tradeOfferContentLink}>Open in browser</p>
            </MainButton>
          </a>
        }
      </React.Fragment>
    </div>
  );
};

TakeOverlayView.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpenOverlay: PropTypes.bool.isRequired,
  loot: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TakeOverlayView;
