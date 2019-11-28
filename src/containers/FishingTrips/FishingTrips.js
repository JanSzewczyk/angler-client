import React, { Component } from "react";
import { MdLibraryAdd } from "react-icons/md";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import FishingTripCard from "../../components/FishingTrips/FishingTripCard/FishingTripCard";
import Button from "../../components/UI/Buttons/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import FishingTripToolbar from "../../components/FishingTrips/FishingTripToolbar/FishingTripToolbar";
import axios from "../../axios";

import { connect } from "react-redux";

import classes from "./FishingTrips.module.css";

class FishingTrips extends Component {
  state = {
    loading: false,
    fishingTrips: []
  };

  componentDidMount() {
    this.loadFishingTripData();
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (this.state.addTrip === false && prevState.addTrip === true) {
  //     this.loadFishingTripData();
  //   }
  // }

  loadFishingTripData = () => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    this.setState({
      loading: true
    });

    axios
      .get("/trip", config)
      .then(res => {
        this.setState({
          loading: false,
          fishingTrips: res.data
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  addNewTripHandler = () => {
    this.props.history.push("/trips/addTrip");
  };

  editTripHandler = id => {
    console.log(id);
    this.props.history.push("/trips/edit/" + id);
  };

  fishingTripSelectHandler = id => {
    this.props.history.push("/trips/" + id);
  };

  render() {
    let content = (
      <div className={classes.Loading}>
        <Spinner />
      </div>
    );

    if (!this.state.loading) {
      content = (
        <div className={classes.FishingTrips}>
          {this.state.fishingTrips.map(trip => (
            <FishingTripCard
              key={trip.id}
              data={trip}
              onEdit={() => this.editTripHandler(trip.id)}
              onShow={() => this.fishingTripSelectHandler(trip.id)}
            />
          ))}
        </div>
      );
    }

    return (
      <Aux>
        <FishingTripToolbar
          left={<>Your Fishing Trips</>}
          right={
            <Button btnType={"Primary"} clicked={this.addNewTripHandler}>
              <MdLibraryAdd size={14} />
              ADD new trip
            </Button>
          }
        />
        {content}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenType: state.auth.tokenType
  };
};

export default connect(mapStateToProps)(FishingTrips);