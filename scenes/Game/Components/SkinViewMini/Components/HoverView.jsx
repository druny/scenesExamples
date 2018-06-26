import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import { getSkinGradeColor, getSkinGradeColorPubg } from "~/utils/skins";

import styles from "../styles.scss";

const HoverView = (props) => {
  const {
    title,
    model,
    grade,
    valueUSD,
    cellCount,
    qualityListObject,
  } = props;

  const qualityList = valueUSD
    ? (
      <div className={styles.contentHoverItemView}>
        <div className={styles.itemNameView}>Price</div>
        <div className={styles.itemPriceView}>${valueUSD}</div>
      </div>
    )
    : (
      qualityListObject
        .filter(({ value }) => value)
        .map(({ name, value, key, price }) => {
          const dropRate = value * 100;

          return (
            <div key={key} className={styles.contentHoverItemView}>
              <div className={styles.itemNameView}>{name}</div>
              <div className={styles.itemValueView}>{value ? dropRate.toFixed(2) : 0}%</div>
              <div className={styles.itemPriceView}>${price ? price.toFixed(2) : 0}</div>
            </div>
         );
        })
    );

  const gradeColor = model
    ? getSkinGradeColor(grade)
    : getSkinGradeColorPubg(grade);
  const skinName = model
    ? `${title} ${model}`
    : title;

  return (
    <ReactTooltip
      border
      isCapture
      id={title}
      type="info"
      effect="solid"
      place="bottom"
      className={styles.hoveredView}
      data-offset={{ "top": 20, "left": 10 }}
    >
      <div className={styles.headerHoverView}>
        <h2
          style={{ color: gradeColor }}
          className={styles.headerTitleView}
        >
          {skinName}
        </h2>
        <p className={styles.headerCountView}>{cellCount} Cells</p>
      </div>
      <div className={styles.contentHoverView}>
        {qualityList}
      </div>
    </ReactTooltip>
  );
};

HoverView.propTypes = {
  grade: PropTypes.string,
  model: PropTypes.string,
  valueUSD: PropTypes.string,
  title: PropTypes.string.isRequired,
  cellCount: PropTypes.number.isRequired,
  qualityListObject: PropTypes.arrayOf(PropTypes.any).isRequired,
};

HoverView.defaultProps= {
  model: "",
  grade: "",
  valueUSD: null,
};

export default HoverView;
