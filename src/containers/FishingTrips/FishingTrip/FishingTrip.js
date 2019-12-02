import React, { Component } from "react";
import { IoIosArrowBack, IoMdText } from "react-icons/io";
import { FaMapMarkedAlt, FaMap } from "react-icons/fa";
import { GiFishing } from "react-icons/gi";
import { MdLibraryAdd, MdAccessTime } from "react-icons/md";
import { Map, TileLayer, Marker } from "react-leaflet";
import { fishingTripMarker } from "../../../components/Maps/Markers/FishingTrip/FishingTripMarker";
import { Redirect } from "react-router-dom";

import axios from "../../../axios";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import FishingTripToolbar from "../../../components/FishingTrips/FishingTripToolbar/FishingTripToolbar";
import Button from "../../../components/UI/Buttons/Button/Button";
import Tile from "../../../components/UI/Tile/Tile";
import Loading from "../../../components/FishingTrips/Loading/Loading";
import FishList from "../../../components/FishingTrips/FishingTrip/FishList/FishList";
import TimeLine from "../../../components/FishingTrips/FishingTrip/TimeLine/TimeLine";
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

    this.setState({
      loading: true
    });

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

  render() {
    let window = <Loading />;

    if (!this.state.loading) {
      let trophyData = this.state.tripData.trophies;

      window = (
        <div className={classes.FishingTrip}>
          <Tile
            sm={"SM-4"}
            md={"MD-3"}
            xl={"XL-3"}
            topLeft={
              <>
                <IoMdText size={16} />
                Your trip
              </>
            }
          >
            <div className={classes.Info}>
              <div className={classes.Title}>Tile</div>
              <div className={classes.Data}>{this.state.tripData.title}</div>
              <div className={classes.Title}>Date</div>
              <div className={classes.Data}>{this.state.tripData.tripDate}</div>
              <div className={classes.Title}>Description</div>
              <div className={classes.Data}>
                {this.state.tripData.description}
              </div>
            </div>
          </Tile>
          <Tile
            sm={"SM-8"}
            md={"MD-6"}
            xl={"XL-6"}
            topLeft={
              <>
                <FaMapMarkedAlt size={16} />
                Fishing spot
              </>
            }
          >
            <Map
              style={{
                width: "100%",
                height: "400px"
              }}
              center={[
                this.state.tripData.fishery.latitude,
                this.state.tripData.fishery.altitude
              ]}
              zoom={12}
              maxZoom={19.8}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                icon={fishingTripMarker}
                position={[
                  this.state.tripData.fishery.latitude,
                  this.state.tripData.fishery.altitude
                ]}
              ></Marker>
            </Map>
          </Tile>
          <Tile
            sm={"SM-4"}
            md={"MD-3"}
            xl={"XL-3"}
            topLeft={
              <>
                <FaMap size={16} />
                Spot details
              </>
            }
          >
            <div className={classes.Info}>
              <div className={classes.Title}>Spot name</div>
              <div className={classes.Data}>
                {this.state.tripData.fishery.name}
              </div>
              <div className={classes.Title}>Description</div>
              <div className={classes.Data}>
                {this.state.tripData.fishery.description}
              </div>
            </div>
          </Tile>
          {this.state.showActionFish ? (
            <ActionFish
              editMode={this.state.editFishMode}
              fishData={this.state.selectedFishData}
              tripId={this.state.tripData.id}
              onClose={this.showActionFishHandler}
            />
          ) : (
            <Aux>
              <Tile
                sm={"SM-8"}
                md={"MD-4"}
                xl={"XL-4"}
                topLeft={
                  <>
                    <GiFishing size={16} />
                    Your trophy list
                  </>
                }
                topRight={
                  <Button
                    btnType={"Primary"}
                    clicked={this.showActionFishHandler}
                  >
                    <MdLibraryAdd size={14} />
                    add trophy
                  </Button>
                }
              >
                {this.state.delLoading ? (
                  <Loading />
                ) : (
                  <FishList
                    fishes={trophyData}
                    onEdit={this.showActionFishEditHandler}
                    onDelete={this.deleteTrophyHandler}
                  />
                )}
              </Tile>
              <Tile
                sm={"SM-6"}
                md={"MD-4"}
                xl={"XL-3"}
                topLeft={
                  <>
                    <MdAccessTime size={16} />
                    Trophies caught time line
                  </>
                }
              >
                <TimeLine fishes={trophyData} />
              </Tile>
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
