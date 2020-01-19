import React, { Component } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Redirect } from "react-router-dom";

import axios from "../../../axios";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import FishingTripDetailsTile from "../../../components/FishingTrips/FishingTrip/FishingTripDetailsTile/FishingTripDetailsTile";
import FishingTripToolbar from "../../../components/FishingTrips/FishingTripToolbar/FishingTripToolbar";
import FisheryTile from "../../../components/FishingTrips/FishingTrip/FisheryTile/FisheryTile";
import Button from "../../../components/UI/Buttons/Button/Button";
import TrophyListTile from "../../../components/FishingTrips/FishingTrip/TrophyListTile/TrophyListTile";
import FisheryDetailsTile from "../../../components/FishingTrips/FishingTrip/FisheryDetailsTile/FisheryDetailsTile";
import TimeLineTile from "../../../components/FishingTrips/FishingTrip/TimeLineTile/TimeLineTile";
import Loading from "../../../components/FishingTrips/Loading/Loading";
import ActionFish from "./ActionFish/ActionFish";

import { connect } from "react-redux";

import classes from "./FishingTrip.module.css";

class FishingTrip extends Component {
  state = {
    tripData: {},
    redirect: false,
    loading: true,
    delLoading: false,
    showActionFish: false,
    editFishMode: false,
    selectedFishData: {}
  };

  componentDidMount() {
    if (!this.props.match.params.id) {
      this.backToTripList();
    } else {
      this.getFishingTripData(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      (this.state.showActionFish === false &&
        prevState.showActionFish === true) ||
      (this.state.delLoading === false && prevState.delLoading === true)
    ) {
      this.getFishingTripData(this.props.match.params.id);
    }
  }

  getFishingTripData = id => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    // this.setState({
    //   loading: true
    // });

    axios
      .get("/trip/" + id, config)
      .then(res => {
        console.log(res.data);
        this.setState({
          tripData: res.data,
          fisheryData: res.data.fishery,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          redirect: true
        });
      });
  };

  onBackToTripList = () => {
    this.setState({
      redirect: true
    });
  };

  showActionFishHandler = () => {
    this.setState({
      showActionFish: !this.state.showActionFish,
      editFishMode: false,
      selectedFishData: {}
    });
  };

  showActionFishEditHandler = id => {
    let fishData = this.state.tripData.trophies.filter(
      fish => fish.id === id
    )[0];
    this.setState({
      showActionFish: !this.state.showActionFish,
      editFishMode: true,
      selectedFishData: fishData
    });
  };

  deleteTrophyHandler = id => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    this.setState({
      delLoading: true
    });

    axios
      .delete("/trophy/" + id, config)
      .then(res => {
        this.setState({
          delLoading: false
        });
      })
      .catch(err => {
        this.setState({
          delLoading: false
        });
      });
  };

  createFisheryPostHandler = fisheryData => {
    const config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    const data = {
      fishery: fisheryData
    };

    axios
      .post("/post", data, config)
      .then(res => {
        console.log("accept FishingTrip createFisheryPostHandler");
        this.getFishingTripData(this.props.match.params.id);
      })
      .catch(err => {
        console.log("error FishingTrip createFisheryPostHandler");
      });
  };

  render() {
    let window = <Loading />;

    if (!this.state.loading) {
      let trophyData = this.state.tripData.trophies;

      window = (
        <div className={classes.FishingTrip}>
          <FishingTripDetailsTile
            title={this.state.tripData.title}
            tripDate={this.state.tripData.tripDate}
            description={this.state.tripData.description}
          />

          <FisheryTile
            position={[
              this.state.tripData.fishery.latitude,
              this.state.tripData.fishery.altitude
            ]}
            onCreatePost={() =>
              this.createFisheryPostHandler(this.state.tripData.fishery)
            }
            sharePost={!this.state.tripData.fishery.share}
          />

          <FisheryDetailsTile
            name={this.state.tripData.fishery.name}
            description={this.state.tripData.fishery.description}
          />

          {this.state.showActionFish ? (
            <ActionFish
              editMode={this.state.editFishMode}
              fishData={this.state.selectedFishData}
              tripId={this.state.tripData.id}
              onClose={this.showActionFishHandler}
            />
          ) : (
            <Aux>
              <TrophyListTile
                onShowActionFish={this.showActionFishHandler}
                loading={this.state.delLoading}
                onEditFish={this.showActionFishEditHandler}
                onDeleteFish={this.deleteTrophyHandler}
                trophyData={trophyData}
              />

              <TimeLineTile trophyData={trophyData} />
            </Aux>
          )}
        </div>
      );
    }

    if (this.state.redirect) {
      window = <Redirect to={"/trips"} />;
    }

    return (
      <Aux>
        <FishingTripToolbar
          left={
            <Button clicked={this.onBackToTripList}>
              <IoIosArrowBack size={14} />
              back
            </Button>
          }
        />
        {window}
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

export default connect(mapStateToProps)(FishingTrip);
