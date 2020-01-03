import React from "react";
import { Link } from "react-router-dom";
import { MdClose, MdEmail, MdPermContactCalendar } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import PropTypes from "prop-types";

import Button from "../UI/Buttons/Button/Button";
import Item from "./Item/Item";

import classes from "./UserPanel.module.css";

const userBar = props => {
  let panelClasses = [classes.UserPanel];
  if (!props.show) {
    panelClasses.push(classes.Hidden);
  }

  return (
    <div className={panelClasses.join(" ")}>
      <div className={classes.UserPanelContent}>
        <div className={classes.Top}>
          <MdClose
            size={16}
            className={classes.Close}
            onClick={props.showUserPanel}
          />
        </div>
        <div className={classes.Content}>
          <Link to={"/profile/" + props.userInfo.nick} style={{
            textDecoration: "none",
            color: "#f4f4f4"
          }}>
            <div className={classes.Profile}>
              <FaUserCircle size={140} />
              <div className={classes.Name}>
                {props.userInfo.firstName + " " + props.userInfo.lastName}
              </div>
            </div>
          </Link>
          <div className={classes.UserDetails}>
            <Item>
              <MdEmail size={24} />
              {props.userInfo.email}
            </Item>
            <Item>
              <MdPermContactCalendar size={24} />
              {props.userInfo.birthDate}
            </Item>
          </div>
          <div className={classes.Bottom}>
            <Link to={"/logout"}>
              <Button btnType={"Logout"}>
                <FiLogOut size={16} /> Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

userBar.propTypes = {
  show: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
  showUserPanel: PropTypes.func.isRequired
};

export default userBar;
