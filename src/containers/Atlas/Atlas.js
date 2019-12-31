import React, { Component } from "react";
import axios from "../../axios";

import FishList from "../../components/Atlas/FishList/FishList";
import FishDetails from "../../components/Atlas/FishDetais/FishDetails";
import Loading from "../../components/FishingTrips/Loading/Loading";
import Aux from "../../hoc/Auxiliary/Auxiliary";

import { connect } from "react-redux";

import classes from "./Atlas.module.css";

class Atlas extends Component {
  state = {
    selected: null,
    fishes: [],
    loading: true
  };

  componentDidMount() {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .get("/fish", config)
      .then(res => {
        this.setState({
          loading: false,
          fishes: res.data
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  selectFishHandler = fish => {
    console.log(fish);
    this.setState({
      selected: fish
    });
  };

  render() {
    let window = <Loading />;

    if (!this.state.loading) {
      window = (
        <Aux>
          <FishList
            fishes={this.state.fishes}
            clicked={this.selectFishHandler}
          />
          {this.state.selected ? <FishDetails fish={this.state.selected}/> : null}
        </Aux>
      );
    }

    return <div className={classes.Atlas}>{window}</div>;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenType: state.auth.tokenType
  };
};

export default connect(mapStateToProps)(Atlas);
