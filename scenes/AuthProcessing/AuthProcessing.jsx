import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { steamAuthUrl } from "~/api/auth";
import { logOutUser } from "~/actions/user";

class AuthProcessing extends React.PureComponent {
  static propTypes = {
    logOutUser: PropTypes.func.isRequired,
    children: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  handleSignInClick = (e) => {
    e.preventDefault();

    window.location.href = steamAuthUrl;
  };

  handleLogOutClick = (e) => {
    if (e) e.preventDefault();

    localStorage.removeItem("token");

    document.location.href = document.location.origin;

    this.props.logOutUser();
  };

  render() {
    const childrenWithProps = React.cloneElement(
      this.props.children,
      {
        onClick: this.handleSignInClick,
        onLogOut: this.handleLogOutClick,
      },
    );

    return (
      <React.Fragment>
        {childrenWithProps}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = ({ logOutUser });

export default connect(() => ({}), mapDispatchToProps)(AuthProcessing);
