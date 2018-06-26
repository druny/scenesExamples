import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import styles from "../styles.scss";

const HoverRevealedBlockView = (props) => {
  const {
    skinId,
    skinData,
    skinExterior,
  } = props;
  const {
    model,
    title,
  } = skinData;

  const titleText = model
    ? `${title} | ${model}`
    : title;

  return (
    <ReactTooltip
      border
      isCapture
      id={skinId}
      type="info"
      place="top"
      effect="solid"
      className={styles.hoveredView}
      data-offset={{ "top": 10, "left": 10 }}
    >
      <h2 className={styles.headerTitleView}>{titleText}</h2>
      <p className={styles.headerCountView}>{skinExterior}</p>
    </ReactTooltip>
  );
};

HoverRevealedBlockView.propTypes = {
  skinExterior: PropTypes.string,
  skinId: PropTypes.string.isRequired,
  skinData: PropTypes.objectOf(PropTypes.any).isRequired,
};

HoverRevealedBlockView.defaultProps = {
  skinExterior: "",
};

export default HoverRevealedBlockView;
