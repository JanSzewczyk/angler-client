import React, { createRef, Component } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdLibraryAdd, MdEdit, MdRemoveCircle } from "react-icons/md";
import { FaMapMarkedAlt, FaRegEdit, FaSave, FaMap } from "react-icons/fa";
import { Map, TileLayer, Marker } from "react-leaflet";

import { fishingTripMarker } from "../../../components/Maps/Markers/FishingTrip/FishingTripMarker";
import { connect } from "react-redux";
import axios from "../../../axios";
import FishingTripToolbar from "../../../components/FishingTrips/FishingTripToolbar/FishingTripToolbar";
import Button from "../../../components/UI/Buttons/Button/Button";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Input from "../../../components/UI/Inputs/Input/Input";
import Loading from "../../../components/FishingTrips/Loading/Loading";

import classes from "./ActionFishingTrip.module.css";

class ActionFishingTrip extends Component {
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
      },
      fisheryDescription: {
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
      }
    },
    fishery: {
      latitude: 50.86346212847674,
      altitude: 23.09660911560059
    },
    formIsValid: false,
    loading: false,
    editMode: false,
    tripId: null,
    fisheryId: null
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({
        loading: true,
        editMode: true
      });

      this.getTripData(this.props.match.params.id);
    }
  }

  getTripData = id => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .get("/trip/" + id, config)
      .then(res => {
        this.setState({
          fishingTripForm: this.fillInputs(res.data),
          fishery: {
            latitude: res.data.fishery.latitude,
            altitude: res.data.fishery.altitude
          },
          tripId: res.data.id,
          fisheryId: res.data.fishery.id,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          redirect: true
        });
      });
  };

  fillInputs = data => {
    const fillData = {};
    for (let key in this.state.fishingTripForm) {
      if (key !== "fisheryName" && key !== "fisheryDescription") {
        fillData[key] = {
          ...this.state.fishingTripForm[key],
          value: data[key],
          valid: true
        };
      } else {
        if (key === "fisheryName") {
          fillData[key] = {
            ...this.state.fishingTripForm[key],
            value: data.fishery.name,
            valid: true
          };
        }
        if (key === "fisheryDescription") {
          fillData[key] = {
            ...this.state.fishingTripForm[key],
            value: data.fishery.description,
            valid: true
          };
        }
      }
    }

    return fillData;
  };

  updateTripHandler = () => {
    let data = {};
    for (let key in this.state.fishingTripForm) {
      if (key !== "fisheryName" && key !== "fisheryDescription")
        data[key] = this.state.fishingTripForm[key].value;
    }

    data = {
      ...data,
      id: this.state.tripId,
      fishery: {
        id: this.state.fisheryId,
        name: this.state.fishingTripForm["fisheryName"].value,
        description: this.state.fishingTripForm["fisheryDescription"].value,
        latitude: this.state.fishery.latitude,
        altitude: this.state.fishery.altitude
      }
    };

    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    this.setState({
      loading: true
    });

    axios
      .put("/trip", data, config)
      .then(res => {
        console.log("update");
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        console.log("error");
        this.backToFishingList();
      });
  };

  removeTripHandler = () => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };
    this.setState({
      loading: true
    });

    axios
      .delete("/trip/" + this.state.tripId, config)
      .then(res => {
        this.backToFishingList();
        console.log("remove");
        //notification
      })
      .catch(err => {
        this.backToFishingList();
        console.log("error");
        //notification
      });
  };

  addNewTripHandler = () => {
    let data = {};
    for (let key in this.state.fishingTripForm) {
      if (key !== "fisheryName" && key !== "fisheryDescription")
        data[key] = this.state.fishingTripForm[key].value;
    }

    data = {
      ...data,
      fishery: {
        name: this.state.fishingTripForm["fisheryName"].value,
        description: this.state.fishingTripForm["fisheryDescription"].value,
        latitude: this.state.fishery.latitude,
        altitude: this.state.fishery.altitude
      }
    };

    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    this.setState({
      loading: true
    });

    axios
      .post("/trip", data, config)
      .then(res => {
        this.backToFishingList();
      })
      .catch(err => {
        console.log(err.response.data);
        this.backToFishingList();
      });
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

    this.setState({
      fishingTripForm: updatedFishingTripForm,
      formIsValid: formIsValid
    });
  };

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
  };

  backToFishingList = () => {
    this.props.history.push("/trips");
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

    let fishingTripForm = (
      <Aux>
        {formElementArray
          .filter(formElement => {
            return (
              formElement.id !== "fisheryName" &&
              formElement.id !== "fisheryDescription"
            );
          })
          .map(formElement => (
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

    let fisheryForm = (
      <Aux>
        {formElementArray
          .filter(formElement => {
            return (
              formElement.id !== "title" &&
              formElement.id !== "description" &&
              formElement.id !== "tripDate"
            );
          })
          .map(formElement => (
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
          <div className={classes.TopForm}>
            <div className={classes.Left}>
              <div className={classes.Title}>
                {this.state.editMode ? (
                  <>
                    <FaRegEdit size={30} />
                    Edit your trip
                  </>
                ) : (
                  <>
                    <MdLibraryAdd size={30} />
                    Add new trip
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={classes.InputForm}>
            <div className={classes.Body}>
              <div className={classes.Content}>
                <div className={classes.Title}>
                  <MdEdit size={30} />
                  Fishing Trip
                </div>
                {fishingTripForm}
              </div>
            </div>
          </div>
          <div className={classes.MapForm}>
            <div className={classes.Body}>
              <div className={classes.Content}>
                <div className={classes.Title}>
                  <FaMapMarkedAlt size={30} />
                  Fishing spot
                </div>
                <label className={classes.MapLabel}>
                  Mark the fishing spot
                </label>
                <Map
                  center={[52.09, 19.02]}
                  zoom={6}
                  style={{
                    width: "100%",
                    height: "400px"
                  }}
                  maxZoom={19.8}
                >
                  <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                  <Marker
                    icon={fishingTripMarker}
                    draggable={true}
                    onDragend={this.updatePosition}
                    position={markerPosition}
                    ref={this.refFishery}
                  ></Marker>
                </Map>
              </div>
            </div>
          </div>
          <div className={classes.InputForm}>
            <div className={classes.Body}>
              <div className={classes.Content}>
                <div className={classes.Title}>
                  <FaMap size={30} />
                  Fishing spot details
                </div>
                {fisheryForm}
              </div>
            </div>
          </div>
          <div className={classes.BottomForm}>
            <div className={classes.Right}>
              <Button clicked={this.backToFishingList}>cancel</Button>
              {this.state.editMode ? (
                <>
                  <Button btnType={"Warming"} clicked={this.removeTripHandler}>
                    <MdRemoveCircle size={15} />
                    remove
                  </Button>
                  <Button
                    btnType={"Primary"}
                    clicked={this.updateTripHandler}
                    disabled={!this.state.formIsValid}
                  >
                    <FaSave size={15} />
                    update trip
                  </Button>
                </>
              ) : (
                <Button
                  btnType={"Primary"}
                  clicked={this.addNewTripHandler}
                  disabled={!this.state.formIsValid}
                >
                  <FaSave size={15} />
                  save
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    if (this.state.loading) {
      window = <Loading />;
    }

    return (
      <Aux>
        <FishingTripToolbar
          left={
            <Button
              clicked={this.backToFishingList}
              disabled={this.state.loading}
            >
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

ActionFishingTrip.propTypes = {
  // editable: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenType: state.auth.tokenType
  };
};

export default connect(mapStateToProps)(ActionFishingTrip);