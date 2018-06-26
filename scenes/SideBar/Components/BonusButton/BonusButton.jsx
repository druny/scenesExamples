import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import { getFreeCasesIds } from "~/actions/cases";
import { toggleBonusModal } from "~/actions/modals";

import icons from "~/styles/icons.scss";

import styles from "./styles.scss";

const giftStyles = classNames(icons.gift, styles.giftView);
const mainViewActiveStyles = classNames(styles.mainView, styles.mainViewActive);

class BonusButton extends React.PureComponent {
  static propTypes = {
    bonuses: PropTypes.shape({
      isNotContainG2ACredits: PropTypes.bool,
      freeCases: PropTypes.shape({
        usedKeys: PropTypes.array,
        availableKeys: PropTypes.array,
      }),
    }).isRequired,
    userId: PropTypes.string.isRequired,
    getFreeCasesIds: PropTypes.func.isRequired,
    toggleBonusModal: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getFreeCasesIds(this.props.userId);
  }

  render() {
    const {
      bonuses,
      toggleBonusModal: onToggleModal,
    } = this.props;
    const {
      isNotContainG2ACredits,
      freeCases: { usedKeys, availableKeys },
    } = bonuses;

    let bonusesCount = 0;

    if (isNotContainG2ACredits) {
      bonusesCount += 1;
    }

    if (availableKeys && usedKeys) {
      const filteredAvailableKeys = availableKeys.filter((availableKey) => (
        !usedKeys.filter((usedKey) => availableKey === usedKey.caseId)[0]
      ));

      bonusesCount += filteredAvailableKeys.length;
    }

    const containerStyles = !bonusesCount
      ? styles.mainView
      : mainViewActiveStyles;

    return (
      <button
        className={containerStyles}
        onClick={() => onToggleModal(true)}
      >
        <icon className={giftStyles} />
        <p className={styles.nameView}>Hextech bonus</p>
        <div className={styles.countViewWrapper}>
          <p className={styles.countView}>{bonusesCount}</p>
        </div>
      </button>
    );
  }
}

const mapStateToProps = (
  {
    bonuses,
    user: { id }
  }
  ) => ({
    bonuses,
    userId: id,
  });
const mapDispatchToProps = ({ getFreeCasesIds, toggleBonusModal });

export default connect(mapStateToProps, mapDispatchToProps)(BonusButton);
