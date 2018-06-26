/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import classNames from "classnames";

import { SIDEBAR_BREAKPOINT } from "~/utils/constans/breakpoints";

import styles from "../styles.scss";
import animationsStyles from "./animationStyles";

const TOUCH_CONFIRM_TIME = 1700;

@injectSheet(animationsStyles)
class GridBlockDefault extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    classes: {},
    confirmPercent: 0,
  };

  constructor() {
    super();

    this.touchTimer = null;
  }

  state = {
    isTouching: false,
  };

  onClick = () => {
    const availableWidth = window.innerWidth;

    if (availableWidth > SIDEBAR_BREAKPOINT.maxWidth) {
      this.props.onClick();
    }
  };

  onConfirmStart = () => {
    const availableWidth = window.innerWidth;

    if (availableWidth <= SIDEBAR_BREAKPOINT.maxWidth) {
      this.touchTimer = setTimeout(() => {
        if (this.state.isTouching) {
          this.setState({ isTouching: false });

          this.props.onClick();
        }
      }, TOUCH_CONFIRM_TIME);

      this.setState({ isTouching: true });
    }
  };

  onConfirmEnd = () => {
    clearTimeout(this.touchTimer);

    this.setState({ isTouching: false });
  };

  render() {
    const { isTouching } = this.state;
    const { classes } = this.props;

    const hoverLineUpStyles = classNames(styles.hoverLine, classes.hoverLineUp);
    const hoverLineDownStyles = classNames(styles.hoverLine, classes.hoverLineDown);
    const hoverLineLeftStyles = classNames(styles.hoverLine, classes.hoverLineLeft);
    const hoverLineRightStyles = classNames(styles.hoverLine, classes.hoverLineRight);
    const pulseStyles = classNames(styles.cardFace, styles.front, styles["pulse-one"]);
    const gridBlockWrapperStyles = classNames(styles.card, styles["hvr-rectangle-out"], classes.card);

    return (
      <div
        onClick={this.onClick}
        onTouchEnd={this.onConfirmEnd}
        onTouchCancel={this.onConfirmEnd}
        onTouchStart={this.onConfirmStart}
        onMouseUp={this.onConfirmEnd}
        onMouseDown={this.onConfirmStart}
        className={gridBlockWrapperStyles}
      >
        <React.Fragment>
          {
            isTouching &&
            <div className={styles.touchStatusBar}>
              <p>Confirm</p>
              <div className={styles.touchStatusBarBackground} />
            </div>
          }
        </React.Fragment>
        <div className={hoverLineUpStyles} />
        <div className={hoverLineDownStyles} />
        <div className={hoverLineLeftStyles} />
        <div className={hoverLineRightStyles} />
        <div className={pulseStyles} >
          <span />
        </div>
      </div>
    )
  }
}

export default GridBlockDefault;
