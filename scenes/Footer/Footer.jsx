import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ContentWrapper from "~/components/ContentWrapper/ContentWrapper";

import icons from "~/styles/icons.scss";

import { toggleMessageUsModal } from "~/actions/modals";

import LogoFooter from "~/images/LogoFooter@2x.png";
import G2AImage from "~/images/G2A-footer.png";

import styles from "./styles.scss";

const g2aLink = "https://pay.g2a.com/";
const twitterLink = "https://twitter.com/hextechcase";
const facebookLink = "http://steamcommunity.com/groups/hextechcase";

const VERSION = version; //eslint-disable-line

const Footer = ({ toggleMessageUsModal: onOpen }) => (
  <div className={styles.positionView}>
    <ContentWrapper>
      <div className={styles.mainView}>
        <div className={styles.leftPart}>
          <div className={styles.siteInfoView}>
            <Link to="/" href="/">
              <img src={LogoFooter} alt="Footer" className={styles.footerLogo} />
            </Link>
            <p>Hextechcase.com </p>
            <p> <icon className={icons.copyright} /> 2018</p>
            <span className={styles.versionView}>Beta v{VERSION}</span>
          </div>
          <div className={styles.additionInfoView}>
            <Link
              to="/tos"
              href="/tos"
            >
              Terms of Service
            </Link>
            <Link
              to="/help"
              href="/help"
            >
              Faq
            </Link>
            <button
              className={styles.contactsView}
              onClick={() => onOpen(true)}
            >
              Message us
            </button>
          </div>
        </div>
        <div className={styles.rightPart}>
          <a href={twitterLink} target="_window">
            <icon className={icons.twitter} />
          </a>
          <a href={facebookLink} target="_window">
            <icon className={icons.steam} />
          </a>
          <a
            href={g2aLink}
            target="_window"
            className={styles.backgroundWrapper}
          >
            <img src={G2AImage} alt="g2a" className={styles.g2aImage} />
          </a>
        </div>
      </div>
    </ContentWrapper>
  </div>
);

Footer.propTypes = {
  toggleMessageUsModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = ({ toggleMessageUsModal });

export default connect(() => ({}), mapDispatchToProps)(Footer);
