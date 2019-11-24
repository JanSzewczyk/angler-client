import React, { createRef, Component } from "react";
import PropTypes from "prop-types";
import { IoIosArrowBack } from "react-icons/io";
import { Map, TileLayer, Marker } from "react-leaflet";
import { fishingTripMarker } from "../../../components/Maps/Markers/FishingTrip/FishingTripMarker";
import { connect } from "react-redux";

import Button from "../../../components/UI/Buttons/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Input from "../../../components/UI/Inputs/Input/Input";

import classes from "./AddFishingTrip.module.css";

class AddFishingTrip extends Component {
  state = {
    fishingTripForm: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text"
        },
        label: "Trip title",
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "text"
        },
        label: "Description",
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 255
        },
        valid: false,
        touched: false
      },
      tripDate: {
        elementType: "input",
        elementConfig: {
          type: "date"
        },
        label: "Date",
        value: "",
        validation: {
          required: true,
          notEmpty: true
        },
        valid: false,
        touched: false
      },
      fisheryName: {
        elementType: "input",
        elementConfig: {
          type: "text"
        },
        label: "Fishery name",
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      }
    },
    fishery: {
      latitude: 50.86346212847674,
      altitude: 23.09660911560059
    },
    // draggable: true,
    formIsValid: false,
    loading: false
  };

  addNewTripHandler = () => {
    let data = {};
    for (let key in this.state.fishingTripForm) {
      if (key !== "fisheryName")
        data[key] = this.state.fishingTripForm[key].value;
    }

    data = {
      ...data,
      fishery: {
        name: this.state.fishingTripForm["fisheryName"].value,
        latitude: this.state.fishery.latitude,
        altitude: this.state.fishery.altitude
      }
    };
    console.log(data);
    this.setState({
      loading: true
    });
    // this.props.onSignup(data);
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.notEmpty) {
      isValid = value !== "" && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFishingTripForm = {
      ...this.state.fishingTripForm
    };

    const updatedFormElement = {
      ...updatedFishingTripForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    updatedFishingTripForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedFishingTripForm) {
      formIsValid =
        updatedFishingTripForm[inputIdentifier].valid && formIsValid;
    }

    console.log(this.state.formIsValid);

    this.setState({
      fishingTripForm: updatedFishingTripForm,
      formIsValid: formIsValid
    });
  };

  // toggleDraggable = () => {
  //   this.setState({ draggable: !this.state.draggable });
  //   console.log("Chuj wie co robi")
  // };
  refFishery = createRef();
  updatePosition = () => {
    const coordinates = this.refFishery.current;
    if (coordinates != null) {
      this.setState({
        fishery: {
          latitude: coordinates.leafletElement.getLatLng().lat,
          altitude: coordinates.leafletElement.getLatLng().lng
        }
      });
    }
    console.log(this.state.fishery);
  };

  render() {
    // Marker position
    const markerPosition = [
      this.state.fishery.latitude,
      this.state.fishery.altitude
    ];

    const formElementArray = [];
    for (let key in this.state.fishingTripForm) {
      formElementArray.push({
        id: key,
        config: this.state.fishingTripForm[key]
      });
    }

    let form = (
      <Aux>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            label={formElement.config.label}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
      </Aux>
    );

    let window = (
      <div className={classes.AddFishingTrip}>
        <div className={classes.AddForm}>
          <div className={classes.InputForm}>
            <div className={classes.Body}>
              <div className={classes.Content}>{form}</div>
            </div>
          </div>
          <div className={classes.MapForm}>
            <div className={classes.Body}>
              <div className={classes.Content}>
                <label className={classes.MapLabel}>
                  Mark the fishing spot
                </label>
                <Map
                  center={[52.09, 19.02]}
                  zoom={6}
                  style={{
                    width: "100%",
                    height: "600px"
                  }}
                  maxZoom={19.8}
                  // zoomControl={false}
                  // dragging={false}
                  // scrollWheelZoom={false} {lat: 50.86346212847674, lng: 23.09660911560059}
                >
                  <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                  <Marker
                    icon={fishingTripMarker}
                    draggable={true}
                    onDragend={this.updatePosition}
                    position={markerPosition}
                    ref={this.refFishery}
                  >
                    {/* <Popup minWidth={90}>
                      <span onClick={this.toggleDraggable}>
                        {this.state.draggable
                          ? "DRAG MARKER"
                          : "MARKER FIXED"}
                      </span>
                    </Popup> */}
                  </Marker>
                </Map>
              </div>
            </div>
          </div>
          <div className={classes.BottomForm}>
            <div className={classes.Left}>
              <Button clicked={this.props.back}>cancel</Button>
              <Button
                btnType={"Primary"}
                clicked={this.addNewTripHandler}
                disabled={!this.state.formIsValid}
              >
                save
              </Button>
            </div>
          </div>
        </div>
      </div>
    );

    if (this.state.loading) {
      window = (
        <div className={classes.Loading}>
          <Spinner />
        </div>
      );
    }
    return (
      <Aux>
        <div className={classes.Header}>
          <div className={classes.Left}>Add new trip</div>
          <div className={classes.Right}>
            <Button clicked={this.props.back} disabled={this.state.login
            }>
              <IoIosArrowBack size={14} />
              back
            </Button>
          </div>
        </div>
        {window}
      </Aux>
    );
  }
}

AddFishingTrip.propTypes = {
  back: PropTypes.func.isRequired
};

export default AddFishingTrip;
