import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { mqttClient, dropFeedTopic } from "~/api/sockets";
import { getDropFeedData } from "~/api/skins";
import { sendErrorNotification } from "~/actions/notifications";

import ItemsViewList from "./Components/ItemsViewList/ItemsViewList";

const EVENT_NAME = "loot-drop";

class DropFeed extends Component {
  static propTypes = {
    sendErrorNotification: PropTypes.func.isRequired,
  };

  state = {
    skins: [],
  };

  componentWillMount() {
    mqttClient.on("message", this.onDropSkin);

    getDropFeedData()
      .then(({ data: skins }) => this.setState({ skins }))
      .catch(({ message }) => this.props.sendErrorNotification({ message }));
  }

  onDropSkin = (topic, payload) => {
    const parsedPayload = JSON.parse(payload);

    if (topic === dropFeedTopic && parsedPayload.eventName === EVENT_NAME) {
      const skin = parsedPayload.eventPayload;
      const skins = [skin, ...this.state.skins];

      this.setState({ skins });
    }
  };

  render() {
    const { skins } = this.state;

    return (
      <ItemsViewList skins={skins} />
    );
  }
}

const mapDispatchToProps = ({ sendErrorNotification });

export default connect(() => ({}), mapDispatchToProps)(DropFeed);
