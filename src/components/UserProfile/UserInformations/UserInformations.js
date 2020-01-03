import React from "react";
import PropTypes from "prop-types";
import { FaUserAlt } from "react-icons/fa";
import { GiAnglerFish } from "react-icons/gi";
import { MdEmail, MdPermContactCalendar } from "react-icons/md";

import Fisheries from "./Fisheries/Fisheries";
import Tile from "../../UI/Tile/Tile";
import Friends from "../../../containers/UserProfile/Friends/Friends";
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
          <>
            <GiAnglerFish size={16} />
            {props.userDetails.nick}
          </>
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
            <MdEmail size={14} /> Email address
          </div>
          <div className={classes.Data}>{props.userDetails.email}</div>
          <div className={classes.Title}>
            <MdPermContactCalendar size={14} /> Date of birth
          </div>
          <div className={classes.Data}>{props.userDetails.birthDate}</div>
        </div>
      </Tile>

      <Friends nick={props.userDetails.nick} userStatus={props.status} redirectTo={props.redirectTo}/>

      {props.status === 0 || props.status === 1 ? (
        <Fisheries fisheries={props.fisheries} />
      ) : null}
      {props.status === 0 ? (
        <Tile sm={"SM-4"} md={"MD-4"} xl={"XL-4"} topLeft={<>Notifications</>}>
          {/* <div className={classes.Info}>
          <img
            className={classes.FishImage}
            src={props.fish.photo}
            alt="fish"
          ></img>
          <div className={classes.Title}>Family</div>
          <div className={classes.Data}>
            {props.fish.family !== "" ? props.fish.family : <>null</>}
          </div>
          <div className={classes.Title}>Look</div>
          <div className={classes.Data}>{props.fish.look}</div>
        </div> */}
        </Tile>
      ) : null}
    </div>
  );
};

UserInformations.propTypes = {
  redirectTo: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired,
  userDetails: PropTypes.object.isRequired,
  fisheries: PropTypes.array.isRequired
};

export default UserInformations;
