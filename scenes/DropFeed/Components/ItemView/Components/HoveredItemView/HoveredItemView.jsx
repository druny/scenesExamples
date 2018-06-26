import React from "react";
import PropTypes from "prop-types";

import { getSkinGradeColor } from "~/utils/skins";

import styles from "./styles.scss"

const HoveredItemView = ({ skin }) => {
  const {
    caseName,
    userImageUrl,
    steamUsername,
    reward: {
      skinTitle,
      skinModel,
      skinGrade,
    },
  } = skin;

  const skinColor = getSkinGradeColor(skinGrade);
  const skinName = skinModel
    ? `${skinTitle} | ${skinModel}`
    : skinTitle;

  return (
    <div className={styles.mainView}>
      <p className={styles.caseName} >{caseName}</p>
      <p
        className={styles.skinName}
        style={{ color: skinColor }}
      >
        {skinName}
      </p>
      <div className={styles.userView}>
        <img
          alt="user"
          src={userImageUrl}
          className={styles.imgView}
        />
        <p className={styles.userNameView}>{steamUsername}</p>
      </div>
    </div>
  )
};

HoveredItemView.propTypes = {
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
    }).isRequired,
  }).isRequired,
};

export default HoveredItemView;
