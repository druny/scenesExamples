import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactCardFlip from "react-card-flip";
import { Link } from "react-router-dom";

import DefaultView from "./Components/DefaultView/DefaultView";
import HoveredItemView from "./Components/HoveredItemView/HoveredItemView";

import styles from "./styles.scss";


const ANIMATION_SPEED = .39;

class ItemView extends Component {
  static propTypes = {
    skin: PropTypes.shape({
      caseId: PropTypes.string,
      caseName: PropTypes.string,
      userImageUrl: PropTypes.string,
      steamUsername: PropTypes.string,
      reward: PropTypes.shape({
        skinId: PropTypes.string,
        skinModel: PropTypes.string,
        skinGrade: PropTypes.string,
        skinTitle: PropTypes.string,
        skinImageUrl: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    isHovered: false,
  };

  onToggle = (value) => this.setState({ isHovered: value });

  render() {
    const { isHovered } = this.state;
    const { skin } = this.props;

    return (
      <Link
        to={`/POLYCASE/${skin.caseId}`}
        href={`/POLYCASE/${skin.caseId}`}
        className={styles.mainView}
        onMouseEnter={() => this.onToggle(true)}
        onMouseLeave={() => this.onToggle(false)}
      >
        <ReactCardFlip
          infinite
          isFlipped={isHovered}
          flipSpeedBackToFront={ANIMATION_SPEED}
          flipSpeedFrontToBack={ANIMATION_SPEED}
        >
          <DefaultView key="front" skin={skin} />
          <HoveredItemView key="back" skin={skin} />
        </ReactCardFlip>
      </Link>
    )
  }
}

export default ItemView;
