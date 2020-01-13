import React from "react";
import PropTypes from "prop-types";
import { FaUserAlt } from "react-icons/fa";
import { GiAnglerFish } from "react-icons/gi";
import { MdEmail, MdPermContactCalendar } from "react-icons/md";

import Fisheries from "./Fisheries/Fisheries";
import Tile from "../../UI/Tile/Tile";
import Friends from "../../../containers/UserProfile/Friends/Friends";
import UserNotifications from "../../../containers/UserProfile/UserNotifications/UserNotifications";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import classes from "./UserInformations.module.css";

const UserInformations = props => {
  return (
    <div className={classes.UserInformations}>
      <Tile
        sm={"SM-6"}
        md={"MD-6"}
        xl={"XL-6"}
        topLeft={
          <Aux>
            <GiAnglerFish size={16} />
            {props.userDetails.nick}
          </Aux>
        }
      >
        <div className={classes.Info}>
          <div className={classes.Title}>
            <FaUserAlt size={14} />
            Name ad Surname
          </div>
          <div className={classes.Data}>
            {props.userDetails.firstName} {props.userDetails.lastName}
          </div>
          <div className={classes.Title}>
            <MdEmail size={14} />
            Email address
          </div>
          <div className={classes.Data}>{props.userDetails.email}</div>
          <div className={classes.Title}>
            <MdPermContactCalendar size={14} />
            Date of birth
          </div>
          <div className={classes.Data}>{props.userDetails.birthDate}</div>
        </div>
      </Tile>

      {props.userStatus === 0 ? <UserNotifications /> : null}

      <Friends
        nick={props.userDetails.nick}
        userStatus={props.userStatus}
        redirectTo={props.redirectTo}
      />

      {props.userStatus === 0 || props.userStatus === 1 ? (
        <Fisheries fisheries={props.fisheries} />
      ) : null}
    </div>
  );
};

UserInformations.propTypes = {
  redirectTo: PropTypes.func.isRequired,
  userStatus: PropTypes.number.isRequired,
  userDetails: PropTypes.object.isRequired,
  fisheries: PropTypes.array.isRequired
};

export default UserInformations;
