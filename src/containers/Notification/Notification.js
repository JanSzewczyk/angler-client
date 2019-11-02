import React, { Component } from "react";
import ee from "event-emitter";

import classes from "./Notification.module.css";

const emitter = new ee();

export const notify = msg => {
  emitter.emit("notification", msg);
};

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: "-100px",
      msg: null
    };

    this.timeout = null;

    emitter.on("notification", msg => {
      this.onShow(msg);
    });
  }

  onShow = msg => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.setState({ top: "-100px" }, () => {
        this.timeout = setTimeout(() => {
          this.showNotification();
        }, 500);
      });
    } else {
      this.showNotification(msg);
    }
  };

  showNotification = msg => {
    this.setState(
      {
        top: "16px",
        msg: msg
      },
      () => {
        this.timeout = setTimeout(() => {
          this.setState({ top: "-100px" });
        }, 5000);
      }
    );
  };

  render() {
    return (
      <div className={classes.Notification} style={{ top: this.state.top }}>
        {this.state.msg ? this.state.msg.msg : null}
      </div>
    );
  }
}

export default Notification;

// const config = {
//   msg: "nie działa w chuj działa "
// };
// notify(config);

// import Notification, { notify } from "../Notification/Notification";
