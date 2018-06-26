import React from "react";
import PropTypes from "prop-types";

import { getSkinGradeGradient } from "~/utils/skins";

import styles from "./styles.scss";

const ItemView = (props) => {
  const {
    skinModel,
    skinGrade,
    skinImageUrl,
  } = props.skin.reward;

  const background = getSkinGradeGradient(skinGrade);

  return (
    <div
      className={styles.mainView}
      style={{ background }}
    >
      <img
        alt={skinModel}
        src={skinImageUrl}
        className={styles.imgView}
      />
    </div>
  );
};

ItemView.propTypes = {
  skin: PropTypes.shape({
    reward: PropTypes.shape({
      skinId: PropTypes.string,
      skinModel: PropTypes.string,
      skinGrade: PropTypes.string,
      skinTitle: PropTypes.string,
      skinImageUrl: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ItemView;
