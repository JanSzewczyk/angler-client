import React, { Component } from "react";
import { MdLibraryAdd } from "react-icons/md";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import FishingTripCard from "../../components/FishingTrips/FishingTripCard/FishingTripCard";
import Button from "../../components/UI/Buttons/Button/Button";
import FishingTripToolbar from "../../components/FishingTrips/FishingTripToolbar/FishingTripToolbar";
import axios from "../../axios";
import Loading from "../../components/FishingTrips/Loading/Loading";

import { connect } from "react-redux";

import classes from "./FishingTrips.module.css";

class FishingTrips extends Component {
  state = {
    loading: true,
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
    const config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

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
    this.props.history.push("/trips/edit/" + id);
  };

  fishingTripSelectHandler = id => {
    this.props.history.push("/trips/" + id);
  };

  createFishingTripPostHandler = fishingTripData => {
    const config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    const data = {
      fishingTrip: fishingTripData
    };

    axios
      .post("/post", data, config)
      .then(res => {
        console.log("accept FishingTrips createFishingTripPostHandler");
        this.loadFishingTripData();
      })
      .catch(err => {
        console.log("error FishingTrips createFishingTripPostHandler");
      });
  };

  render() {
    let content = <Loading />;

    if (!this.state.loading) {
      content = (
        <div className={classes.FishingTrips}>
          {this.state.fishingTrips.map(trip => (
            <FishingTripCard
              key={trip.id}
              fishingTripData={trip}
              onEdit={() => this.editTripHandler(trip.id)}
              onShow={() => this.fishingTripSelectHandler(trip.id)}
              onShare={() => this.createFishingTripPostHandler(trip)}
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
