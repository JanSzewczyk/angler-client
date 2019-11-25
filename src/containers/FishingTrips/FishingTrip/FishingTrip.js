import React, { Component } from "react";
import { IoIosArrowBack } from "react-icons/io";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import FishingTripToolbar from "../../../components/FishingTrips/FishingTripToolbar/FishingTripToolbar";
import Button from "../../../components/UI/Buttons/Button/Button";

import classes from "./FishingTrip.module.css";

class FishingTrip extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
  }
  render() {
    return (
      <Aux>
        <FishingTripToolbar
          left={
            <Button>
              <IoIosArrowBack size={14} />
              back
            </Button>
          }
        />
        <div className={classes.FishingTrip}>
            sadfasdfas
        </div>
      </Aux>
    );
  }
}

export default FishingTrip;
