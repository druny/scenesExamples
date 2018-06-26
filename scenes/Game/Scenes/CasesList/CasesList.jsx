import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Grid } from "react-bootstrap";

import Loader from "~/components/Loaders/Loader";

import { getAllCasesAction } from "~/actions/cases";
import { caseTypes } from "~/utils/constans/cases";

import TypeCasesList from "./Components/TypeCasesList/TypeCasesList";

import styles from "./styles.scss";

const caseRenderTypes = [
  caseTypes.CSGO,
  caseTypes.VGO,
];

class CasesList extends React.Component {
  static propTypes = {
    cases: PropTypes.arrayOf(PropTypes.object).isRequired,
    gameMode: PropTypes.string.isRequired,
    getAllCasesAction: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getAllCasesAction(this.props.gameMode);
  }

  render() {
    const { cases } = this.props;

    const mappedTypedCases = caseRenderTypes.map((type) => <TypeCasesList cases={cases} caseType={type} />);

    return (
      <Loader
        loaded={!!cases.length}
        style={{ minHeight: "calc(65vh - 60px)" }}
      >
        <Grid fluid className={styles.sectionTovs}>
          {mappedTypedCases}
        </Grid>
      </Loader>
    );
  }
}

const mapStateToProps = ({ cases }) => ({ cases });
const mapDispatchToProps = ({ getAllCasesAction });

export default connect(mapStateToProps, mapDispatchToProps)(CasesList);
