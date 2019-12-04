import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Input from "../../components/UI/Inputs/AnimInput/Input";
import AnimButton from "../../components/UI/Buttons/AnimButton/AnimButton";
import ValidMsg from "../../components/UI/ValidMsg/ValidMsg";
import Spinner from "../../components/UI/Spinner/Spinner";
import Feedback from "../../components/Feedback/Feedback";

import * as actions from "../../store/actions/index";

import classes from "./Signup.module.css";

class Signup extends Component {
  state = {
    signupForm: {
      nick: {
        elementType: "input",
        elementConfig: {
          type: "text"
        },
        label: "Nick",
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      firstName: {
        elementType: "input",
        elementConfig: {
          type: "text"
        },
        label: "First name",
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      lastName: {
        elementType: "input",
        elementConfig: {
          type: "text"
        },
        label: "Last Name",
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email"
        },
        label: "E-Mail",
        value: "",
        validation: {
          required: true,
          pattern: /\S+@\S+\.\S+/
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password"
        },
        label: "Password",
        value: "",
        validation: {
          required: true,
          minLength: 9,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
        },
        valid: false,
        touched: false
      },
      repeatPassword: {
        elementType: "input",
        elementConfig: {
          type: "password"
        },
        label: "Repeat password",
        value: "",
        validation: {
          required: true,
          equal: "password"
        },
        valid: false,
        touched: false
      },
      birthDate: {
        elementType: "input",
        elementConfig: {
          type: "date",
          placeholder: "date"
        },
        label: "Date of birth",
        value: "",
        validation: {
          // required: true,
        },
        valid: true,
        touched: false
      }
    },
    formIsValid: false,
  };

  componentDidMount() {
    this.props.onInit();
  }

  signupHandler = event => {
    event.preventDefault();
    console.log("elo dołaczyleś do nas");
    const data = {};
    for (let key in this.state.signupForm) {
      if (key !== "repeatPassword")
        data[key] = this.state.signupForm[key].value;
    }

    this.props.onSignup(data);
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

    if (rules.pattern) {
      isValid = rules.pattern.test(value) && isValid;
    }

    if (rules.equal) {
      isValid = value === this.state.signupForm[rules.equal].value && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedSignupForm = {
      ...this.state.signupForm
    };

    const updatedFormElement = {
      ...updatedSignupForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    updatedSignupForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedSignupForm) {
      formIsValid = updatedSignupForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      signupForm: updatedSignupForm,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.signupForm) {
      formElementArray.push({
        id: key,
        config: this.state.signupForm[key]
      });
    }

    let form = (
      <Aux>
        <h1>Join to us</h1>
        <form onSubmit={this.signupHandler}>
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
          <ValidMsg show={this.props.error} message={this.props.errorMessage} />
          <AnimButton
            btnStyle={"SignUpButton"}
            btnType={"Btn2"}
            disabled={!this.state.formIsValid}
          >
            Sign up
          </AnimButton>
        </form>
      </Aux>
    );

    if (this.props.loading) {
      form = (
        <Aux>
          <Spinner />
          <h1>Waiting ...</h1>
        </Aux>
      );
    }

    if (this.props.confirmation) {
      form = (
        <Feedback title={"Congratulations"} success={true}>
          You joined us. <br /> <br />
          Now go to your mailbox, we have sent you a message, read it and
          confirm your email.
        </Feedback>
      );
    }

    return <div className={classes.Signup}>{form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    confirmation: state.signup.confirmation,
    loading: state.signup.loading,
    error: state.signup.error,
    errorMessage: state.signup.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInit: () => dispatch(actions.signupInit()),
    onSignup: data => dispatch(actions.signup(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);