import React from "react";
import { NavLink as Link } from "react-router-dom";

import styles from "./styles.scss";

const menuList = [
  {
    key: 1,
    name: "Opens History",
    path: "/",
  },
  {
    key: 2,
    name: "Deposit History",
    path: "/deposit-history",
  }
];

const MainMenuList = () => {
  const mappedMenuList = menuList.map(({ name, path, key }) => (
    <Link
      exact
      key={key}
      to={path}
      href={path}
      className={styles.listItemView}
      activeClassName={styles.activeListView}
    >
      <div className={styles.contentItemView}>
        <p className={styles.textItemView}>{name}</p>
      </div>
    </Link>
  ));

  return (
    <div className={styles.mainView}>
      {mappedMenuList}
    </div>
  );
};

export default MainMenuList;
