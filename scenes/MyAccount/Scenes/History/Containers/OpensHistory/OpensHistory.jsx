import _ from "lodash";
import React from "react";
import ReactTable from "react-table"
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AbsentDataTable from "../../Components/AbsentDataTable/AbsentDataTable";
import Pagination from "../Pagination/Pagination";

import Columns from "./Columns";

import styles from "../styles.scss"

const STEP_COUNT = 20;

class OpensHistory extends React.Component {
  static propTypes = {
    inventory: PropTypes.arrayOf(PropTypes.any),
  };

  static defaultProps = {
    inventory: [],
  };

  state = {
    sortedInventory: [],
    paginatedInventory: [],
  };

  componentWillMount() {
    const finishedInventory = this.props.inventory.filter(({ status }) => (status === "FINISHED"));
    const sortedInventory = _.sortBy(finishedInventory, (loot) => (-new Date(loot.createdAt).getTime()));
    const paginatedInventory = _.slice(sortedInventory, 0, STEP_COUNT);

    this.setState({ sortedInventory, paginatedInventory })
  }

  onChange = (paginatedInventory) => this.setState({ paginatedInventory });

  render() {
    const { inventory } = this.props;
    const { sortedInventory, paginatedInventory } = this.state;
    const isLoots = !!inventory.length;

    return (
      <React.Fragment>
        <ReactTable
          manual
          minRows={0}
          noDataText=""
          loadingText=""
          columns={Columns}
          showPagination={false}
          defaultPageSize={STEP_COUNT}
          data={paginatedInventory}
          className={styles.ReactTable}
          showPaginationBottom={isLoots}
          headerClassName={styles.headerClassName}
        />
        <React.Fragment>
          {
            isLoots
              ? (
                <Pagination
                  step={STEP_COUNT}
                  data={sortedInventory}
                  onChange={this.onChange}
                />
              )
              : <AbsentDataTable />
          }
        </React.Fragment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({ inventory: user.inventory });

export default connect(mapStateToProps)(OpensHistory);
