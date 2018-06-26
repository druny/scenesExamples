import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";

import {
  MY_ACCOUNT,
  MY_ACCOUNT_ICON,
  MY_ACCOUNT_LINK,
  PROVABLY_FAIR,
  PROVABLY_FAIR_LINK,
  PROVABLY_FAIR_ICON,
  AFFILIATES,
  AFFILIATES_LINK,
  AFFILIATES_ICON,
  HELP,
  HELP_LINK,
  HELP_ICON
} from "./MenuLinkTypes";

import styles from "./styles.scss";

const activeMenuItemStyles = classNames(styles.menuItemContent, styles.menuItemContentActive);

class MenuList extends React.PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    pagePath: PropTypes.string.isRequired,
  };

  state = {
    activeLink: "",
    menuItems: [
      {
        name: MY_ACCOUNT,
        href: MY_ACCOUNT_LINK,
        icon: MY_ACCOUNT_ICON,
        isPrivate: true,
      },
      {
        name: AFFILIATES,
        href: AFFILIATES_LINK,
        icon: AFFILIATES_ICON,
        isPrivate: false,
      },
      {
        name: PROVABLY_FAIR,
        href: PROVABLY_FAIR_LINK,
        icon: PROVABLY_FAIR_ICON,
        isPrivate: false,
      },
      {
        name: HELP,
        href: HELP_LINK,
        icon: HELP_ICON,
        isPrivate: false,
      },
    ]
  };

  onClick = (link) => this.setState({ activeLink: link });

  render() {
    const { isAuthenticated, pagePath } = this.props;
    const { menuItems, activeLink } = this.state;

    const menuList = menuItems
      .filter(({ isPrivate }) => !isPrivate || isPrivate === isAuthenticated)
      .map(({ name, href, icon }) => (
        <li
          key={name}
          className={styles.menuItem}
        >
          <Link
            exact
            replace
            to={href}
            href={href}
            onClick={() => this.onClick(href)}
            className={
              (pagePath === href && activeLink === href)
                ? activeMenuItemStyles
                : styles.menuItemContent
            }
            activeClassName={
              (pagePath === href && activeLink === href)
                ? styles.menuItemContentActive
                : ""
            }
          >
            <icon className={icon} />
            <p className={styles.menuItemContentText}>{name}</p>
          </Link>
        </li>
      ));

    return (
      <ul className={styles.mainView} >
        {menuList}
      </ul>
    );
  }
}

const mapStateToProps =
  ({
     user,
     options: { pagePath },
  }) => ({
    pagePath,
    isAuthenticated: !!user.id,
  });

export default connect(mapStateToProps)(MenuList);
