import React from "react";
import PropTypes from "prop-types";

import { caseTypes } from "~/utils/constans/cases";

import HeaderTypes from "./HeaderTypes";

import styles from "./styles.scss";

const Header = ({ caseType }) => (
  <div className={styles.mainView}>
    <img
      alt={caseType}
      src={
        HeaderTypes[caseType]
          ? HeaderTypes[caseType].imageSrc
          : HeaderTypes[caseTypes.CSGO].imageSrc
      }
    />
  </div>
);

Header.propTypes = {
  caseType: PropTypes.string,
};

Header.defaultProps = {
  caseType: caseTypes.CSGO,
};

export default Header;
