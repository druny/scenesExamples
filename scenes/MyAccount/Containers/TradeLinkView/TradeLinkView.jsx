import React from "react";
import PropTypes from "prop-types";

import MainButton from "~/components/Buttons/MainButton/MainButton";

import { updateTradeUrl } from "~/api/user";

import styles from "./styles.scss";

const TRADE_LINK_URL = "https://trade.opskins.com/settings";

class TradeLinkView extends React.Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.any).isRequired,
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onUpdateUserInfo: PropTypes.func.isRequired,
  };

  state = {
    tradeLink: "",
  };

  componentWillMount() {
    const { tradeUrl } = this.props.user;
    const { tradeLink } = this.state;

    if (!tradeLink) {
      this.setState({ tradeLink: tradeUrl });
    }
  }

  onChangeTradeLink = ({ target }) => this.setState({ tradeLink: target.value });

  saveTradeLink = async () => {
    try {
      const { user, onUpdateUserInfo } = this.props;
      const { tradeLink: tradeUrl } = this.state;
      const { id: userId } = user;

      await updateTradeUrl({ userId, tradeUrl });

      onUpdateUserInfo({ ...this.props.user, tradeUrl });

      this.props.onSuccess({ message: "Your trade URL has been saved to your HexTech profile." });
    } catch ({ response }) {
      this.props.onError({ message: "Your trade URL format is invalid." });
    }
  };

  render() {
    const { tradeUrl } = this.props.user;
    const { tradeLink } = this.state;

    return (
      <div className={styles.mainView}>
        <div className={styles.leftView}>
          <h2 className={styles.titleView}>Enter your trade link</h2>
          <a
            target="_blank"
            href={TRADE_LINK_URL}
            className={styles.linkView}
          >
            Get the link
          </a>
        </div>
        <div className={styles.rightView}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={tradeLink}
              placeholder="Enter trade link here"
              className={styles.inputView}
              onChange={this.onChangeTradeLink}
            />
            <div className={styles.buttonView}>
              <MainButton
                disabled={!tradeLink || tradeLink === tradeUrl}
                onClick={this.saveTradeLink}
              >
                <p className={styles.buttonContentView}>Save</p>
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TradeLinkView;
