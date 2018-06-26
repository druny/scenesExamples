import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {
  getSkinGradeColor,
  getSkinGradeColorPubg,
  getGradeBackwardCompatibilityName,
} from "~/utils/skins";

import HoverView from "./Components/HoverView";

import styles from "./styles.scss";

class SkinViewMini extends React.Component {
  static propTypes = {
    properties: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    properties: {},
  };

  state = {
    props: {},
    isDisplayHover: false,
  };

  componentWillMount() {
    const props = { ...this.props, ...this.props.properties };

    this.setState({ props });
  }

  onEnter = () => this.setState({ isDisplayHover: true });

  onLeave = () => this.setState({ isDisplayHover: false });

  render() {
    const { isDisplayHover } = this.state;
    const {
      grade,
      title,
      model,
      SkinCase,
      valueUSD,
      imageSource,
      wellWornPrice,
      factoryNewPrice,
      fieldTestedPrice,
      minimalWearPrice,
      battleScarredPrice,
    } = this.state.props;
    const {
      cellCount,
      factoryNewDropRate,
      minimalWearDropRate,
      fieldTestedDropRate,
      wellWornDropRate,
      battleScarredDropRate,
    } = SkinCase;

    const qualityListObject = [
      {
        key: 1,
        name: "Factory New",
        value: factoryNewDropRate,
        price: factoryNewPrice,
      },
      {
        key: 2,
        name: "Minimal Wear",
        value: minimalWearDropRate,
        price: minimalWearPrice,
      },
      {
        key: 3,
        name: "Field-Tested",
        value: fieldTestedDropRate,
        price: fieldTestedPrice,
      },
      {
        key: 4,
        name: "Well-Worn",
        value: wellWornDropRate,
        price: wellWornPrice,
      },
      {
        key: 5,
        name: "Battle Scarred",
        value: battleScarredDropRate,
        price: battleScarredPrice,
      },
    ];

    const gradeColor = model
      ? getSkinGradeColor(grade)
      : getSkinGradeColorPubg(grade);

    const gradeName = getGradeBackwardCompatibilityName(grade);
    const radialGradientStyles = classNames(styles.mainView, styles[`radial-gradient-${gradeName.toLowerCase()}`]);

    return (
      <React.Fragment>
        {
          isDisplayHover &&
          <HoverView
            title={title}
            model={model}
            grade={grade}
            valueUSD={valueUSD}
            cellCount={cellCount}
            qualityListObject={qualityListObject}
          />
        }
        <div
          data-tip=""
          data-for={title}
          onMouseEnter={this.onEnter}
          onMouseLeave={this.onLeave}
          className={radialGradientStyles}
        >
          <div
            className={styles.dotView}
            style={{ backgroundColor: gradeColor }}
          />
          <img
            className={styles.imageView}
            src={imageSource}
            alt="skin"
          />
          <div className={styles.countView}>x{cellCount}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default SkinViewMini;
