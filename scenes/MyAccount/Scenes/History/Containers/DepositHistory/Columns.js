/* eslint-disable */

import React from "react";
import moment from "moment";

import styles from "../styles.scss";

const columnStyles = {
  padding: "24px 0"
};

const headerStyle = { width: "calc(100%/3) !important" };

export default [
  {
    Header: "Date",
    accessor: "createdAt",
    Cell: ({ value }) => moment(value).format("MM-DD-YYYY h:m:s"),
    headerStyle: {
      ...headerStyle,
      textAlign: "left",
      marginLeft: "30px",
    },
    style: {
      ...columnStyles,
      textAlign: "left",
      marginLeft: "40px",
    },
    className: styles.contentClassName,
    headerClassName: styles.headerClassName,
  },
  {
    Header: "Total",
    accessor: "valueUSD",
    Cell: ({ value }) => `$${value.toFixed(2)}`,
    headerStyle: {
      ...headerStyle,
      textAlign: "right",
      marginRight: "24px",
    },
    style: {
      ...columnStyles,
      textAlign: "right",
      marginRight: "30px",
    },
    className: styles.contentClassName,
    headerClassName: styles.headerClassName,
  },
  {
    Header: "Source",
    accessor: "source",
    headerStyle: {
      ...headerStyle,
      textAlign: "right",
      marginRight: "40px",
    },
    style: {
      ...columnStyles,
      textAlign: "right",
      marginRight: "36px",
    },
    className: styles.contentClassName,
    headerClassName: styles.headerClassName,
  },
];
