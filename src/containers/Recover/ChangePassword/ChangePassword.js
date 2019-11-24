import React, { Component } from "react";
import axios from "../../../axios";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Input from "../../../components/UI/Inputs/AnimInput/Input";
import AnimButton from "../../../components/UI/Buttons/AnimButton/AnimButton";
import ValidMsg from "../../../components/UI/ValidMsg/ValidMsg";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Feedback from "../../../components/Feedback/Feedback";

import classes from "./ChangePassword.module.css";

class ChangePassword extends Component {
  state = {
    email: "",
    nick: "",
    changePasswordForm: {
      password: {
        elementType: "input",
        elementConfig: {
          type: "password"
        },
        label: "New password",
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
        label: "Repeat new password",
        value: "",
        validation: {
          required: true,
          equal: "password"
        },
        valid: false,
        touched: false
      }
    },
    badAddress: false,
    formIsValid: false,
    redirect: false,
    loading: false,
    confirmation: false,
    error: false,
    errorMessage: ""
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let email = "";
    let nick = "";
    for (let param of query.entries()) {
      if (param[0] === "email") {
        email = param[1];
      }
      if (param[0] === "nick") {
        nick = param[1];
      }
    }

    if (email !== "" && nick !== "") {
      this.setState({
        email: email,
        nick: nick
      });
    } else {
      this.setState({
        badAddress: true,
        redirect: true,
        loading: false,
        error: true,
        errorMessage: "Bad address !!"
      });
    }
  }

  signupHandler = event => {
    event.preventDefault();

    this.setState({
      loading: true
    });

    const data = {
      email: this.state.email,
      newPassword: this.state.changePasswordForm.password.value
    };

    axios
      .put("/retrieve", data)
      .then(response => {
        console.log(response);
        this.setState({
          redirect: true,
          confirmation: true,
          loading: false,
          error: false,
          errorMessage: ""
        });
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          redirect: true,
          loading: false,
          error: true,
          errorMessage: err.response.data.message
        });
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

    if (rules.pattern) {
      isValid = rules.pattern.test(value) && isValid;
    }

    if (rules.equal) {
      isValid =
        value === this.state.changePasswordForm[rules.equal].value && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedChangePasswordForm = {
      ...this.state.changePasswordForm
    };

    const updatedFormElement = {
      ...updatedChangePasswordForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    updatedChangePasswordForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedChangePasswordForm) {
      formIsValid =
        updatedChangePasswordForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      changePasswordForm: updatedChangePasswordForm,
      formIsValid: formIsValid
    });
  };

  redirectToLoginHandler = () => {
    setTimeout(() => {
      this.props.history.replace("/");
    }, 10000);
  };

  render() {
    if (this.state.redirect) {
      this.redirectToLoginHandler();
    }

    const formElementArray = [];
    for (let key in this.state.changePasswordForm) {
      formElementArray.push({
        id: key,
        config: this.state.changePasswordForm[key]
      });
    }

    let view = (
      <Aux>
        <h1>Change Your password</h1>
        <br />
        <h2>Hello {this.state.nick}</h2>
        Below, You can change your password to a new one.
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
          <ValidMsg show={this.state.error} message={this.state.errorMessage} />
          <AnimButton
            btnStyle={"SignUpButton"}
            btnType={"Btn2"}
            disabled={!this.state.formIsValid}
          >
            Change password
          </AnimButton>
        </form>
      </Aux>
    );

    if (this.state.loading) {
      view = (
        <Aux>
          <Spinner />
          <h1>Waiting ...</h1>
        </Aux>
      );
    }

    if (this.state.confirmation) {
      view = (
        <Feedback title={"Success"} success={true}>
          Your password has been changed.
          <br />
          <br />
          To log in, click the button above or wait a moment (it will redirect
          you automatically).
        </Feedback>
      );
    }

    if (this.state.badAddress) {
      view = (
        <Feedback title={"Problem"} success={true}>
          {this.state.errorMessage}
          <br />
          <br />
          Sorry for the inconvenience.
        </Feedback>
      );
    }

    return <div className={classes.ChangePassword}>{view}</div>;
  }
}

export default ChangePassword;
