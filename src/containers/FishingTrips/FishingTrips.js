import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import FishingTripCard from "../../components/FishingTrips/FishingTripCard/FishingTripCard";
import Button from "../../components/UI/Buttons/Button/Button";

import classes from "./FishingTrips.module.css";

class FishingTrips extends Component {
  render() {
    return (
      <Aux>
          <div className={classes.Header}>
              <div className={classes.Left}>
                  Your Fishing Trips
              </div>
              <div className={classes.Right}>
                <Button btnType={"Primary"}>
                  ADD new trip
                </Button>
              </div>
          </div>
        <div className={classes.FishingTrips}>
            <FishingTripCard />
            <FishingTripCard />
            <FishingTripCard />
            <FishingTripCard />
            <FishingTripCard />
            <FishingTripCard />
            <FishingTripCard />
            <FishingTripCard />
            <FishingTripCard />
        </div>
      </Aux>
    );
  }
}

export default FishingTrips;
