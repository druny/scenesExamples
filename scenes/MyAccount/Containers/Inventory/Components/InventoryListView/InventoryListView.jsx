import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Row, Col } from "react-bootstrap";

import SkinInventoryView from "../../../SkinInventoryView/SkinInventoryView";

import styles from "./styles.scss";

const rowClassNames = classNames("row", styles.row);

const SELL_SKIN = "SELL";
const TAKE_SKIN = "TAKE";

const InventoryListView = (props) => {
  const {
    user,
    onRewardSkin,
    maxDisplaying,
    filteredBySkinApp,
  } = props;

  const inventoryList = filteredBySkinApp
    .filter((game, index) => maxDisplaying > index)
    .map((game) => (
      <Col
        xs={12}
        sm={4}
        lg={3}
        key={game.id}
        className={styles.skinInventoryView}
      >
        <SkinInventoryView
          {...game.revealedCell}
          userId={user.id}
          gridGame={game}
          onTake={() => onRewardSkin(game, TAKE_SKIN)}
          onSell={() => onRewardSkin(game, SELL_SKIN)}
        />
      </Col>
    ));

  return(
    <Grid fluid className={styles.inventoryView}>
      <Row bsClass={rowClassNames}>{inventoryList}</Row>
    </Grid>
  );
};

InventoryListView.propTypes = {
  onRewardSkin: PropTypes.func.isRequired,
  maxDisplaying: PropTypes.number.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  filteredBySkinApp: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InventoryListView;
