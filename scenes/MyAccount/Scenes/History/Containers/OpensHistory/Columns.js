/* eslint-disable */

import React from "react";
import classNames from "classnames";

import {
  getSkinGradeColor,
  getSkinGradeColorPubg,
  getColorByRewardingStatus,
} from "~/utils/skins";

import styles from "../styles.scss";

const nameContentViewStyles = classNames(styles.contentClassName, styles.nameContentView);

export default [
  {
    Header: "",
    accessor: "revealedCell",
    Cell: ({ value }) => <img  style={{ maxWidth: "80px" }} src={value.skinImageUrl} alt="skin" />,
    headerStyle: {
      margin: "0 -28px",
    },
    style: {
      margin: "-10px -20px",
    },
    className: styles.contentClassName,
    headerClassName: styles.headerClassName,
  },
  {
    Header: "Name",
    accessor: "revealedCell",
    Cell: ({ value: { skinTitle, skinModel, skinExterior, skinGrade } }) => {
      const color = skinModel
        ? getSkinGradeColor(skinGrade)
        : getSkinGradeColorPubg(skinGrade);

      const skinName = skinModel
        ? (
          <div>
            <p>{skinTitle} | {skinModel}</p>
            <p>({skinExterior})</p>
          </div>
        )
        : skinTitle;

      return <div style={{ color, width: "220px" }}>{skinName}</div>
    },
    headerStyle: {
      textAlign: "left",
      width: "220px !important",
    },
    style: {
      textAlign: "left",
      width: "220px !important",
    },
    className: nameContentViewStyles,
    headerClassName: styles.headerClassName,
  },
  {
    Header: "Price",
    accessor: "revealedCell",
    Cell: ({ value }) => `$${value.valueUSD.toFixed(2)}`,
    headerStyle: {
      textAlign: "right",
      marginLeft: "-14px",
    },
    style: {
      textAlign: "right",
    },
    className: styles.contentClassName,
    headerClassName: styles.headerClassName,
  },
  {
    Header: "Case",
    accessor: "Case.name",
    headerStyle: {
      textAlign: "center",
      marginLeft: "-8px",
    },
    style: {
      textAlign: "left",
      marginLeft: "58px",
    },
    className: styles.contentClassName,
    headerClassName: styles.headerClassName,
  },
  {
    Header: "Size",
    accessor: "Case.length",
    Cell: ({ value }) => {
      const size = Math.sqrt(value);

      return (
        <p>{`${size}x${size}`}</p>
      );
    },
    headerStyle: {
      textAlign: "right",
      marginRight: "38px",
      marginLeft: "54px",
    },
    style: {
      textAlign: "right",
    },
    className: styles.contentClassName,
    headerClassName: styles.headerClassName,
  },
  {
    Header: "Status",
    accessor: "rewardAction",
    Cell: ({ value }) => {
      const rewardValue = !value ? "INVENTORY" : value;
      const rewardActionColor = getColorByRewardingStatus(rewardValue);

      return <p style={{ color: rewardActionColor }}>{rewardValue}</p>
    },
    headerStyle: {
      textAlign: "center",
      marginLeft: "22px",
    },
    style: {
      textAlign: "right",
      marginRight: "36px",
    },
    className: styles.contentClassName,
    headerClassName: styles.headerClassName,
  },
];
