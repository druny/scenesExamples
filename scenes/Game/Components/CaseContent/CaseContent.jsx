import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import MainButton from "~/components/Buttons/MainButton/MainButton";

import { sortSkinsByPrice } from "~/utils/skins";

import SkinViewMini from "../SkinViewMini/SkinViewMini";

import styles from "./styles.scss";

const MAX_DISPLAYING = 8;

class CaseContent extends React.Component {
  static propTypes = {
    length: PropTypes.number.isRequired,
    skins: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    mappedSkins: [],
    isClicked: true,
  };

  componentWillMount() {
    this.updateMappedSkins(MAX_DISPLAYING);
  }

  onButtonClick = () => {
    const { isClicked } = this.state;

    // eslint-disable-next-line
    isClicked
      ? this.updateMappedSkins(this.props.skins.length)
      : this.updateMappedSkins(MAX_DISPLAYING);

    return this.setState({ isClicked: !isClicked });
  };

  updateMappedSkins = (maxDisplaying) => {
    const { skins, length } = this.props;

    const values = _.memoize(_.values);
    const orderedSkins = values(_.orderBy(skins, sortSkinsByPrice, "desc"));

    const mappedSkins = orderedSkins
      .filter((skin, index) => (index < maxDisplaying))
      .map((skin) => <SkinViewMini key={skin.id} {...{ ...skin, length }} />);

    this.setState({ mappedSkins })
  };

  render() {
    const { skins } = this.props;
    const { mappedSkins, isClicked } = this.state;

    return (
      <div className={styles.mainView}>
        <div className={styles.headerView}>
          <div className={styles.leftPart}>
            <h1 className={styles.mainTitle}>Case content</h1>
            <p className={styles.secondaryTitle}>Hover over the item for details</p>
          </div>
          <div className={styles.rightPart}>
            <p className={styles.showingInfoView}>
              Showing {mappedSkins.length} of {skins.length}
            </p>
            <div className={styles.buttonView}>
              <MainButton
                type="murky"
                onClick={this.onButtonClick}
                disabled={isClicked && mappedSkins.length === skins.length}
              >
                <div className={styles.buttonContent}>
                  <p>
                    Show
                    <React.Fragment>
                      {
                        isClicked
                          ? " all"
                          : " less"
                      }
                    </React.Fragment>
                  </p>
                </div>
              </MainButton>
            </div>
          </div>
        </div>
        <div className={styles.bottomView}>
          <div className={styles.skinsView}>{mappedSkins}</div>
        </div>
      </div>
    );
  }
}

export default CaseContent;
