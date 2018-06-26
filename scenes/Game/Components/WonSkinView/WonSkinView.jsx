import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AnimatedNumber from "react-animated-number";

import MainButton from "~/components/Buttons/MainButton/MainButton";
import { getSkinGradeColor, getSkinGradeGradient } from "~/utils/skins";

import styles from "./styles.scss";
import animationStyles from "./animationStyles";

import LayerGlow from "./images/LayerGlow.png";
import RevealContainer from "./images/RevealContainer.png";
import RevealContainerHeader from "./images/RevealContainerHeader.png";
import RevealContainerHeaderProfit from "./images/RevealContainerHeaderProfit.png";
import LayerDashCircle from "./images/LayerDashCircle.png";
import LayerSmallCircleBoarder from "./images/LayerSmallCircleBoarder.png";
import LayerWeaponBackgroundDark from "./images/LayerWeaponBackgroundDark.png";

const imageWrapperStyles = classNames(styles.centerBackground, styles.imageWrapper);
const shakeFadeLeftStyles = classNames(styles.arrowView, animationStyles.shakeFadeLeft);
const arrowShapeTopStyles = classNames(styles.defaultStyles, styles.arrowShapeTop);
const arrowShapeBottomStyles = classNames(styles.defaultStyles, styles.arrowShapeBottom);
const shakeFadeRightStyles = classNames(styles.arrowViewLeft, animationStyles.shakeFadeRight);
const topShapeStyles = classNames(styles.defaultStyles, styles.topShape);
const middleShapeStyles = classNames(styles.defaultStyles, styles.middleShape);
const bottomShapeStyles = classNames(styles.defaultStyles, styles.bottomShape);
const shapeBorderWrapperRotatedStyles = classNames(styles.shapeBorderWrapper, styles.shapeBorderWrapperRotated);

class WonSkinView extends React.Component {
  static propTypes = {
    grade: PropTypes.string,
    model: PropTypes.string,
    skinExterior: PropTypes.string,
    mode: PropTypes.string.isRequired,
    onSell: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    valueUSD: PropTypes.number.isRequired,
    casePrice: PropTypes.number.isRequired,
    imageSource: PropTypes.string.isRequired,
  };

  static defaultProps = {
    grade: "",
    model: "",
    skinExterior: "",
  };

  state = {
    price: 0,
    profitValue: 0,
    progressList: [],
    leftTitleArrows: [],
    rightTitleArrows: [],
    isDisplayInfo: false,
    isDisplayImage: false,
    isDisplayContent: false,
    isDisplayProgress: false,
    isDisplaySkinName: false,
    isDisplaySkinValue: false,
  };

  componentWillMount() {
    const { valueUSD, casePrice } = this.props;

    const firstStepAnimation = { isDisplayContent: true };
    const secondStepAnimation = { isDisplayProgress: true };
    const thirdStepAnimation = { isDisplayImage: true };
    const fourthStepAnimation = {
        price: valueUSD,
        isDisplayInfo: true,
        profitValue: valueUSD - casePrice,
    };
    const fifthStepAnimation = {
      isDisplaySkinName: true,
      isDisplaySkinValue: true,
    };

    setTimeout(() => this.setState(firstStepAnimation), 1000);
    setTimeout(() => this.setState(secondStepAnimation), 1500);
    setTimeout(() => this.setState(thirdStepAnimation), 4000);
    setTimeout(() => this.setState(fourthStepAnimation), 4500);
    setTimeout(() => this.setState(fifthStepAnimation), 5000);

    const progressList = [];

    for (let i = 0; i < 46; i += 1) {
      progressList.push(<li key={i} />);
    }

    const COUNT_ARROWS = 3;
    const rightTitleArrows = [];
    const leftTitleArrows = [];

    for (let i = 0; i < COUNT_ARROWS; i += 1) {
      const animationTime = (i + 1) / 2;
      const animationDuration = `${animationTime}s`;

      rightTitleArrows.push(
        <div
          key={i}
          style={{ animationDuration }}
          className={shakeFadeLeftStyles}
        >
          <div className={arrowShapeTopStyles} />
          <div className={arrowShapeBottomStyles} />
        </div>
      );

      leftTitleArrows.push(
        <div
          key={i}
          style={{ animationDuration }}
          className={shakeFadeRightStyles}
        >
          <div className={arrowShapeTopStyles} />
          <div className={arrowShapeBottomStyles} />
        </div>
      );
    }

    this.setState({
      progressList,
      leftTitleArrows,
      rightTitleArrows,
    });
  }

  render() {
    const {
      mode,
      title,
      grade,
      model,
      onSell,
      onClose,
      valueUSD,
      casePrice,
      imageSource,
      skinExterior,
    } = this.props;
    const {
      price,
      profitValue,
      progressList,
      isDisplayInfo,
      isDisplayImage,
      leftTitleArrows,
      isDisplayContent,
      rightTitleArrows,
      isDisplaySkinName,
      isDisplayProgress,
      isDisplaySkinValue,
    } = this.state;

    const isDemo = mode === "DEMO";
    const gradeColor = getSkinGradeColor(grade);
    const closeBtnStyle = isDemo ? { width: "250px" } : null;
    const skinBackground = model
      ? getSkinGradeGradient(grade)
      : getSkinGradeGradient();

    const skinName = model
      ? `${title} | ${model}`
      : title;

    let LayerBackground = RevealContainer;
    const isDisplayProfitBackground = (valueUSD - casePrice) > 0 || isDemo;

    if (isDisplaySkinValue && !isDisplayProfitBackground) {
      LayerBackground = RevealContainerHeader;
    } else if (isDisplayProfitBackground && isDisplaySkinValue) {
      LayerBackground = RevealContainerHeaderProfit;
    }

    return (
      <div className={styles.mainView}>
        {
          isDisplayContent &&
            <React.Fragment>
              <img
                alt="LayerBackground"
                src={LayerBackground}
                className={styles.centerBackground}
              />
              <img
                alt="LayerGlow"
                src={LayerGlow}
                className={styles.layerDashCircleView}
              />
              <img
                alt="LayerSmallCircleBoarder"
                src={LayerSmallCircleBoarder}
                className={styles.layerDashCircleView}
              />
              <img
                alt="LayerWeaponBackgroundDark"
                src={LayerWeaponBackgroundDark}
                className={styles.layerDashCircleView}
              />
              <img
                alt="LayerDashCircle"
                src={LayerDashCircle}
                className={styles.layerDashCircleView}
              />
              <React.Fragment>
                {
                  isDisplayImage &&
                  <div
                    style={{ background: skinBackground }}
                    className={imageWrapperStyles}
                  >
                    <img
                      alt="won skin"
                      src={imageSource}
                      className={styles.imageView}
                    />
                  </div>
                }
              </React.Fragment>
              <React.Fragment>
                {
                  isDisplayProgress &&
                  <ul className={styles["circle-container"]}>
                    {progressList}
                  </ul>
                }
              </React.Fragment>
              <React.Fragment>
                {
                  isDisplayInfo &&
                  <div className={styles.topView}>
                    <React.Fragment>
                      {
                        isDisplaySkinValue &&
                        <div className={animationStyles.skinValue}>
                          <div className={styles.skinValueView}>
                            <p className={styles.skinValueTitle}>Skin Value</p>
                            <div>
                              <React.Fragment>{leftTitleArrows}</React.Fragment>
                              <AnimatedNumber
                                value={price}
                                duration={2000}
                                formatValue={(number) => (<div className={styles.priceView}><span>$</span>{number.toFixed(2)}</div>)}
                                style={{
                                  fontSize: 34,
                                  transition: "0.8s ease-out",
                                  transitionProperty: "background-color, color, opacity",
                                }}
                              />
                              <React.Fragment>{rightTitleArrows}</React.Fragment>
                            </div>
                          </div>
                          <React.Fragment>
                            {
                              isDemo &&
                              <p className={styles.demoModeView}>Demo Mode</p>
                            }
                          </React.Fragment>
                          <React.Fragment>
                            {
                              !isDemo && (valueUSD - casePrice) > 0 &&
                              <div className={styles.profitView}>
                                <AnimatedNumber
                                  value={profitValue}
                                  duration={2000}
                                  formatValue={(number) => (<p>Your profit: ${number.toFixed(2)}</p>)}
                                  style={{
                                    transition: "0.8s ease-out",
                                    transitionProperty: "background-color, color, opacity",
                                  }}
                                />
                              </div>
                            }
                          </React.Fragment>
                        </div>}
                    </React.Fragment>
                  </div>
                }
              </React.Fragment>
              <React.Fragment>
                {
                  isDisplayInfo &&
                  <div className={styles.bottomView}>
                    <div className={styles.skinInfoWrapper}>
                      <div className={styles.shapeBorderWrapper}>
                        <div className={topShapeStyles} />
                        <div
                          style={{ background: gradeColor }}
                          className={middleShapeStyles}
                        />
                        <div className={bottomShapeStyles} />
                      </div>
                      <div className={styles.mockedWidth}>
                        <div className={styles.skinInfo}>
                          {
                            isDisplaySkinName &&
                              <React.Fragment>
                                <p
                                  style={{ color: gradeColor }}
                                  className={styles.skinInfoTitle}
                                >
                                  {skinName}
                                </p>
                                <p className={styles.skinInfoGrade}>{skinExterior}</p>
                              </React.Fragment>
                          }
                        </div>
                      </div>
                      <div className={shapeBorderWrapperRotatedStyles}>
                        <div className={topShapeStyles} />
                        <div
                          style={{ background: gradeColor }}
                          className={middleShapeStyles}
                        />
                        <div className={bottomShapeStyles} />
                      </div>
                    </div>
                    <React.Fragment>
                      {
                        isDisplaySkinValue &&
                        <div className={animationStyles.skinValue}>
                          <div className={styles.buttonsView}>
                            {
                              !isDemo &&
                              <div className={styles.sellButtonView}>
                                <MainButton
                                  type="dedicate"
                                  onClick={onSell}
                                >
                                  <p className={styles.sellButtonContentView}>Sell</p>
                                </MainButton>
                              </div>
                            }
                            <div
                              className={styles.closeButtonView}
                              style={closeBtnStyle}
                            >
                              <MainButton
                                type="simple"
                                onClick={onClose}
                              >
                                <p className={styles.closeButtonContentView}>Close</p>
                              </MainButton>
                            </div>
                          </div>
                        </div>
                      }
                    </React.Fragment>
                  </div>
                }
              </React.Fragment>
            </React.Fragment>
        }
      </div>
    );
  }
}

export default WonSkinView;
