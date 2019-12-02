import React, { Component } from "react";
import PropTypes from "prop-types";
import { GiBoatFishing } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { FaSave, FaRegEdit } from "react-icons/fa";

import axios from "../../../../axios";
import Tile from "../../../../components/UI/Tile/Tile";
import Button from "../../../../components/UI/Buttons/Button/Button";
import Input from "../../../../components/UI/Inputs/Input/Input";
import Loading from "../../../../components/FishingTrips/Loading/Loading";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";

import { connect } from "react-redux";

import classes from "./ActionFish.module.css";

class ActionFish extends Component {
  state = {
    fishForm: {
      fishId: {
        elementType: "select",
        elementConfig: {
          options: []
        },
        label: "Fish species",
        value: 1,
        validation: {},
        valid: true
      },
      length: {
        elementType: "input",
        elementConfig: {
          type: "number"
        },
        label: "Fish length",
        value: 0,
        validation: {
          required: true,
          biggerThanZero: true
        },
        valid: false,
        touched: false
      },
      weight: {
        elementType: "input",
        elementConfig: {
          type: "number"
        },
        label: "Fish weight",
        value: 0,
        validation: {
          required: true,
          biggerThanZero: true
        },
        valid: false,
        touched: false
      },
      time: {
        elementType: "input",
        elementConfig: {
          type: "time"
        },
        label: "Catching time",
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    fishData: {},
    // fishPhoto: "",
    formIsValid: false,
    loading: true
  };

  componentDidMount() {
    this.getFishesList();
  }

  getFishesList = () => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .get("/fish", config)
      .then(res => {
        console.log(res.data);

        if (this.props.editMode && this.props.fishData) {
          this.setState({
            // fishPhoto: this.props.fishData.fish.photo,
            fishForm: this.fillInputs(res.data),
            fishData: res.data,
            loading: false
          });
        } else {
          this.setState({
            fishForm: this.fillOptions(res.data),
            fishData: res.data,
            loading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };

  fillOptions = fishesData => {
    let fishOptions = [];
    fishesData.map(fish =>
      fishOptions.push({
        value: fish.id,
        displayValue: fish.name
      })
    );

    let fillState = {
      ...this.state.fishForm,
      fishId: {
        ...this.state.fishForm["fishId"],
        elementConfig: {
          options: fishOptions
        }
      }
    };
    return fillState;
  };

  fillInputs = data => {
    let fillOptions = this.fillOptions(data);
    console.log(fillOptions);
    console.log(this.props.fishData);
    const fillData = {};
    for (let key in fillOptions) {
      if (key !== "fishId") {
        fillData[key] = {
          ...fillOptions[key],
          value: this.props.fishData[key],
          valid: true
        };
      }

      if (key === "fishId") {
        fillData[key] = {
          ...fillOptions[key],
          value: this.props.fishData.fish.id,
          valid: true
        };
      }
    }
    console.log(fillData);

    return fillData;
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.biggerThanZero) {
      isValid = parseFloat(value) > 0 && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFishForm = {
      ...this.state.fishForm
    };

    const updatedFormElement = {
      ...updatedFishForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    updatedFishForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedFishForm) {
      formIsValid = updatedFishForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      fishForm: updatedFishForm,
      formIsValid: formIsValid
    });
  };

  addNewFishHandler = () => {
    let data = {};
    for (let key in this.state.fishForm) {
      data[key] = this.state.fishForm[key].value;
    }
    data = {
      ...data,
      tripId: this.props.tripId
    };

    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .post("/trophy", data, config)
      .then(res => {
        this.props.onClose();
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };

  editFishHandler = () => {
    let data = {};
    for (let key in this.state.fishForm) {
      data[key] = this.state.fishForm[key].value;
    }
    data = {
      ...data,
      tripId: this.props.tripId,
      id: this.props.fishData.id
    };

    console.log(data);

    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .put("/trophy", data, config)
      .then(res => {
        this.props.onClose();
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.fishForm) {
      formElementArray.push({
        id: key,
        config: this.state.fishForm[key]
      });
    }

    let fishForm = (
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

    return (
      <Tile
        sm={"SM-12"}
        md={"MD-6"}
        xl={"XL-6"}
        topLeft={
          <>
            <GiBoatFishing size={16} />
            {this.props.editMode ? (
              <>Edit your trophy </>
            ) : (
              <> Add new trophy </>
            )}
          </>
        }
        topRight={
          <MdClose
            size={16}
            className={classes.Close}
            onClick={this.props.onClose}
          />
        }
        botRight={
          <>
            <Button clicked={this.props.onClose}>close</Button>
            {this.props.editMode ? (
              <Button
                btnType={"Primary"}
                disabled={!this.state.formIsValid}
                clicked={this.editFishHandler}
              >
                <FaRegEdit size={15} />
                edit your trophy
              </Button>
            ) : (
              <Button
                btnType={"Primary"}
                disabled={!this.state.formIsValid}
                clicked={this.addNewFishHandler}
              >
                <FaSave size={15} />
                add new trophy
              </Button>
            )}
          </>
        }
      >
        <div className={classes.ActionFish}>
          <div className={classes.Column}>
            {this.state.loading ? <Loading /> : fishForm}
          </div>
          <div className={classes.Column}>
            {!this.state.loading ? (
              <Aux>
                <div className={classes.FishLabel}>This is your fish</div>
                <img
                  className={classes.FishImage}
                  src={
                    this.state.fishData.filter(
                      fish =>
                        fish.id === parseInt(this.state.fishForm.fishId.value)
                    )[0].photo
                  }
                  alt="fish"
                ></img>
              </Aux>
            ) : null}
          </div>
        </div>
      </Tile>
    );
  }
}

ActionFish.propTypes = {
  editMode: PropTypes.bool.isRequired,
  fishData: PropTypes.object.isRequired,
  tripId: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenType: state.auth.tokenType
  };
};

export default connect(mapStateToProps)(ActionFish);
