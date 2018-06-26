import _ from "lodash";
import React from "react";
import ReactTable from "react-table"
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUserCredits } from "~/api/user";

import Loader from "~/components/Loaders/Loader";

import AbsentDataTable from "../../Components/AbsentDataTable/AbsentDataTable";
import Pagination from "../Pagination/Pagination";

import Columns from "./Columns";

import styles from "../styles.scss"

const STEP_COUNT = 20;

class DepositHistory extends React.Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  state = {
    deposits: [],
    isFetching: true,
    sortedDeposits: [],
    paginatedDeposits: [],
  };

  async componentWillMount() {
    const FILTER_TYPE = "CLEARED";

    const { user } = this.props;
    const { data: credits } = await getUserCredits(user.id);

    const deposits = credits.filter(({ status, valueUSD }) => (status === FILTER_TYPE && valueUSD > 0));
    const sortedDeposits = _.sortBy(deposits, (deposit) => (-new Date(deposit.createdAt).getTime()));
    const paginatedDeposits = _.slice(sortedDeposits, 0, STEP_COUNT);

    return this.setState({
      deposits,
      sortedDeposits,
      paginatedDeposits,
      isFetching: false,
    });
  }

  onChange = (paginatedDeposits) => this.setState({ paginatedDeposits });

  render() {
    const {
      deposits,
      isFetching,
      sortedDeposits,
      paginatedDeposits,
    } = this.state;

    const isDeposits = !!deposits.length;

    return (
      <Loader loaded={!isFetching}>
        {
          !isFetching &&
          <React.Fragment>
            <ReactTable
              minRows={0}
              noDataText=""
              loadingText=""
              data={paginatedDeposits}
              columns={Columns}
              showPagination={false}
              defaultPageSize={STEP_COUNT}
              className={styles.ReactTable}
              showPaginationBottom={isDeposits}
              headerClassName={styles.headerClassName}
            />
            <React.Fragment>
              {
                isDeposits
                  ? (
                    <Pagination
                      step={STEP_COUNT}
                      data={sortedDeposits}
                      onChange={this.onChange}
                    />
                  )
                : <AbsentDataTable />
              }
            </React.Fragment>
          </React.Fragment>
        }
      </Loader>
    );
  }

}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(DepositHistory);
