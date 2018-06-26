import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MemoryRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "~/components/PrivateRouter/PrivateRouter";

import OpensHistory from "./Containers/OpensHistory/OpensHistory";
import DepositHistory from "./Containers/DepositHistory/DepositHistory";
import MainMenuList from "./Components/MainMenuList/MainMenuList";

const History = ({ isAuthenticated }) => (
  <Router>
    <React.Fragment>
      <MainMenuList />
      <Switch>
        <PrivateRoute
          exact
          path="/"
          isAuthenticated={isAuthenticated}
          component={OpensHistory}
        />
        <PrivateRoute
          exact
          path="/deposit-history"
          isAuthenticated={isAuthenticated}
          component={DepositHistory}
        />
      </Switch>
    </React.Fragment>
  </Router>
);

History.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ user }) => ({ isAuthenticated: !!user.id });

export default connect(mapStateToProps)(History);
