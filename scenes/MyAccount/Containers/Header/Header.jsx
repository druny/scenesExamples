import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import MainButton from "~/components/Buttons/MainButton/MainButton";

import icons from "~/styles/icons.scss";

import styles from "./styles.scss";

const Header = (props) => {
  const { user, onLogOut, onChangeTradeUrlButton } = props;

  const userProfileLink = `http://steamcommunity.com/profiles/${user.steamId}`;

  return (
    <div className={styles.mainView}>
      <a
        target="_blank"
        href={userProfileLink}
        className={styles.steamNameView}
      >
        <MainButton type="murkyGrey">
          <div className={styles.steamNameContentView}>
            <p>{user.steamUsername}</p>
            <icon className={icons.steam} />
          </div>
        </MainButton>
      </a>

      <a
        target="_blank"
        href={userProfileLink}
      >
        <img
          alt="user"
          src={user.imageUrl}
          className={styles.logoView}
        />
      </a>

      <div className={styles.simpleButtons}>
        <MainButton
          type="murkyGrey"
          onClick={onChangeTradeUrlButton}
        >
          <p>Change trade url</p>
        </MainButton>
      </div>
      <div className={styles.simpleButtons}>
        <MainButton
          type="murkyGrey"
          onClick={onLogOut}
        >
          <Link to="/" href="/" >
            <p>Log Out</p>
          </Link>
        </MainButton>
      </div>
    </div>
  );
};

Header.propTypes = {
  onLogOut: PropTypes.func,
  onChangeTradeUrlButton: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

Header.defaultProps = {
  onLogOut: () => console.log("onLogOut"),
};

export default Header;
