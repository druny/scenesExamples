import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Row, Col } from "react-bootstrap";

import CaseView from "~/components/CaseView/CaseView";

import { caseTypes } from "~/utils/constans/cases";

import Header from "./Components/Header/Header";

import styles from "./styles.scss";

const rowClassNames = classNames("show-grid", styles.row);

const TypeCasesList = ({ cases, caseType }) => {
  const filteredCases = _.filter(cases, ({ skinApp }) => skinApp === caseType);
  const mappedCases = _.map(filteredCases, (Case) => (
    <React.Fragment key={Case.id}>
      <Col className={styles.cols}>
        <CaseView {...Case} />
      </Col>
    </React.Fragment>
  ));

  if (mappedCases.length) {
    return (
      <React.Fragment>
        <Header caseType={caseType} />
        <Row bsClass={rowClassNames}>{mappedCases}</Row>
      </React.Fragment>
    );
  }

  return null;
};

TypeCasesList.propTypes = {
  caseType: PropTypes.string,
  cases: PropTypes.arrayOf(PropTypes.any).isRequired,
};

TypeCasesList.defaultProps = {
  caseType: caseTypes.CSGO,
};

export default TypeCasesList;
