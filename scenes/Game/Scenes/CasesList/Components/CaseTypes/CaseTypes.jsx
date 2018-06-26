import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import { caseTypes } from "~/utils/constans/cases";
import { changeCaseType } from "~/actions/options";

import styles from "./styles.scss";

import CSGOImage from "./images/CSGO@2x.png";
import PUBGImage from "./images/PUBG@2x.png";

const buttonViewActiveStyles = classNames(styles.buttonView, styles.buttonViewActive);

class CaseTypes extends Component {
  static propTypes = {
    caseType: PropTypes.string.isRequired,
    changeCaseType: PropTypes.func.isRequired,
  };

  toggleCaseType = (caseType) => this.props.changeCaseType(caseType);

  render() {
    const { caseType } = this.props;
    const { CSGO, PUBG } = caseTypes;

    const csgoStyles = CSGO === caseType.toString()
      ? buttonViewActiveStyles
      : styles.buttonView;
    const pubgStyles = PUBG === caseType.toString()
      ? buttonViewActiveStyles
      : styles.buttonView;

    return (
      <div className={styles.mainView}>
        <h2 className={styles.titleView}>Case type</h2>
        <div className={styles.linksView}>
          <button
            className={csgoStyles}
            onClick={() => this.toggleCaseType(CSGO)}
          >
            <img
              alt="csgo"
              src={CSGOImage}
              className={styles.imageView}
            />
          </button>
          <button
            className={pubgStyles}
            onClick={() => this.toggleCaseType(PUBG)}
          >
            <img
              alt="pubg"
              src={PUBGImage}
              className={styles.imageView}
            />
          </button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ options: { caseType } }) => ({ caseType });
const mapDispatchToProps = ({ changeCaseType });

export default connect(mapStateToProps, mapDispatchToProps)(CaseTypes);
