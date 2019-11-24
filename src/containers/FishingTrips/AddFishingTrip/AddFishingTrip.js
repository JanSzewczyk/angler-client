import React, { Component } from "react";
import PropTypes from "prop-types";
import { IoIosArrowBack } from "react-icons/io";

import Button from "../../../components/UI/Buttons/Button/Button";

import classes from "./AddFishingTrip.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

class AddFishingTrip extends Component {
  static propTypes = {};

  render() {
    return (
      <Aux>
        <div className={classes.Header}>
          <div className={classes.Left}>Add new trip</div>
          <div className={classes.Right}>
            <Button clicked={this.props.back}>
              <IoIosArrowBack size={14} />
              back
            </Button>
          </div>
        </div>
        <div className={classes.AddFishingTrip}>
          <div className={classes.AddForm}>
            <div className={classes.InputForm}>

            </div>
<div>
              
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

AddFishingTrip.propTypes = {
  back: PropTypes.func.isRequired
};
export default AddFishingTrip;
