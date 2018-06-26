import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import ItemView from "../ItemView/ItemView";

import styles from "./styles.scss";

const SKINS_COUNT = 10;

const ItemsViewList = ({ skins }) => {
  const orderedSkins = _.sortBy(skins, [{ finishedAt: "asc" }]);

  const Items = orderedSkins.slice(0, SKINS_COUNT)
    .map((skin) => (
      <ItemView
        key={skin.id}
        skin={skin}
      />
    ));

  return (
    <div className={styles.mainView}>
      {Items}
    </div>
  );
};

ItemsViewList.propTypes = {
  skins: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ItemsViewList;
