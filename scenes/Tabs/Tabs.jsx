/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getAllCasesAction } from "~/actions/cases";

import SignInSteamTab from "./Containers/SignInSteamTab/SignInSteamTab";

class Tabs extends React.Component {
  static propTypes = {
    logIn: PropTypes.bool,
    pagePath: PropTypes.string,
  };

  static defaultProps = {
    logIn: false,
    pagePath: "",
  };

  state = {
    tabs: [
      {
        position: 1,
        conditions: { logIn: false, },
        payload: <SignInSteamTab />,
        pages: ["/"],
      },
    ]
  };

  render() {
    const { pagePath } = this.props;
    const { tabs } = this.state;

    const renderedTabs = tabs.map(({ payload, position, conditions, pages }) => {
      let isRender = true;

      if (pages) {
        isRender = pages.includes(pagePath);
      }

      for (const condition in conditions) {
        const propsCondition = this.props[condition];
        const currentCondition = conditions[condition];

        if (
          condition &&
          currentCondition !== propsCondition ||
          propsCondition.include &&
          !propsCondition.include(propsCondition)
        ) {
          isRender = false;
        }
      }

      return isRender &&
        <section key={position}>
          { payload }
        </section>
    });

    return renderedTabs;
  }
}

const mapStateToProps = ({
    user,
    options: { pagePath }
  }) => ({
    pagePath,
    logIn: !!user.id
  });
const mapDispatchToProps = ({ getAllCasesAction });

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
