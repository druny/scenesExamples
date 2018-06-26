import React from "react";
import PropTypes from "prop-types";
import SidebarModule from "react-sidebar";

import { SIDEBAR_BREAKPOINT } from "~/utils/constans/breakpoints";

import { SidebarBreakpointView } from "~/components/Breakpoints/Breakpoints"

import AppBar from "./Components/AppBar/AppBar";
import SideBarContent from "./Containers/SideBarContent/SideBarContent";

import styles from "./styles.scss";

const WIDTH_BREAKPOINT = SIDEBAR_BREAKPOINT;

class SideBar extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  state = {
    isOpen: true,
    isTabletView: false,
  };

  componentWillMount() {
    this.getIsOpenSideBar();
  }

  componentDidMount() {
    window.addEventListener("resize", (data) => this.getIsOpenSideBar(data.currentTarget.innerWidth));
  }

  onToggleSideBar = (isOpen = !this.state.isOpen) => this.setState({ isOpen });

  onSideBarClick = () => {
    const { isTabletView } = this.state;

    if (isTabletView) {
      this.onToggleSideBar();
    }
  };

  getIsOpenSideBar = (availableWidth = window.innerWidth) => {
    const { minWidth, maxWidth } = WIDTH_BREAKPOINT;

    let isOpen = true;

    if (minWidth) isOpen = minWidth > availableWidth;
    if (maxWidth) isOpen = maxWidth < availableWidth;
    if (minWidth && maxWidth) isOpen = maxWidth < availableWidth > minWidth;

    this.setState({ isOpen, isTabletView: !isOpen });
  };

  render() {
    const { isAuthenticated } = this.props;
    const { isOpen, isTabletView } = this.state;

    const overlayClassName = isTabletView
      ? styles.overlayView
      : styles.hiddenOverlayView;

    return (
      <SidebarModule
        docker
        open={isOpen}
        shadow={false}
        touchHandleWidth={30}
        onSetOpen={this.onToggleSideBar}
        overlayClassName={overlayClassName}
        contentClassName={styles.contentView}
        sidebarClassName={styles.sideBarView}
        sidebar={<SideBarContent onClick={this.onSideBarClick} isAuthenticated={isAuthenticated} />}
      >
        <React.Fragment>
          <SidebarBreakpointView>
            <AppBar onClick={this.onToggleSideBar} />
          </SidebarBreakpointView>
          <React.Fragment>
            { this.props.children }
          </React.Fragment>
        </React.Fragment>
      </SidebarModule>
    );
  }
}

export default SideBar;
