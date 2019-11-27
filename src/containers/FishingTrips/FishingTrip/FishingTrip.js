import React, { Component } from "react";
import { IoIosArrowBack, IoMdText } from "react-icons/io";
import { FaMapMarkedAlt, FaMap } from "react-icons/fa";
import { Map, TileLayer, Marker} from "react-leaflet";
import { Redirect } from "react-router-dom";

import axios from "../../../axios";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import FishingTripToolbar from "../../../components/FishingTrips/FishingTripToolbar/FishingTripToolbar";
import Button from "../../../components/UI/Buttons/Button/Button";
import Tile from "../../../components/UI/Tile/Tile";
import Loading from "../../../components/FishingTrips/Loading/Loading";
import { fishingTripMarker } from "../../../components/Maps/Markers/FishingTrip/FishingTripMarker";

import { connect } from "react-redux";

import classes from "./FishingTrip.module.css";

class FishingTrip extends Component {
  state = {
    tripData: {},
    redirect: false,
    loading: true
  };

  componentDidMount() {
    if (!this.props.match.params.id) {
      this.setState({
        redirect: true
      });
    } else {
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

  goBack = () => {
    this.setState({
      redirect: true
    });
  };

  render() {
    let window = <Loading />;

    if (!this.state.loading) {
      window = (
        <div className={classes.FishingTrip}>
          {/* <div className={classes.TripDetails}>trip details</div>
        <div className={classes.FisheryMap}>map</div>
        <div className={classes.FisheryDetails}>map</div>
        <div className={classes.FishHistory}>fish history</div>
        <div className={classes.Fishes}>fishes</div> */}
          <Tile
            sm={"SM-6"}
            md={"MD-4"}
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
            sm={"SM-6"}
            md={"MD-4"}
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
                height: "350px"
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
                ref={this.refmarker}
              ></Marker>
            </Map>
          </Tile>
          <Tile
            sm={"SM-6"}
            md={"MD-4"}
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
          <Tile sm={"SM-6"} md={"MD-4"} xl={"XL-3"}>
            fishes
          </Tile>
          <Tile sm={"SM-6"} md={"MD-4"} xl={"XL-3"}>
            history fishes
          </Tile>
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
            <Button clicked={this.goBack}>
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
