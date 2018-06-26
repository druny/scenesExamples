import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { toggleDepositModal } from "~/actions/modals";
import { getUserBalance } from "~/actions/user";

import UserBalance from "../../Components/UserBalance/UserBalance";
import MenuList from "../MenuList/MenuList";

class ContentMenuPrivate extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    balance: PropTypes.objectOf(PropTypes.any).isRequired,
    getUserBalance: PropTypes.func.isRequired,
    toggleDepositModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { userId } = this.props;

    this.props.getUserBalance(userId);
  }

  render() {
    const { balance, toggleDepositModal: onToggle } = this.props;

    return (
      <div>
        <UserBalance
          onClick={() => onToggle(true)}
          balance={balance.credits.cleared}
        />
        <MenuList />
      </div>
    );
  }
}

const mapStateToProps = ({ balance, user: { id: userId } }) => ({ balance, userId });
const mapDispatchToProps = ({ toggleDepositModal, getUserBalance });

export default connect(mapStateToProps, mapDispatchToProps)(ContentMenuPrivate);