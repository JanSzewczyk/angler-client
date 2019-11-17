import React, { Component } from "react";
import axios from "../../axios-home";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Buttons/AnimButton/AnimButton";
import ValidMsg from "../../components/UI/ValidMsg/ValidMsg";
import Spinner from "../../components/UI/Spinner/Spinner";
import Feedback from "../../components/Feedback/Feedback";

import classes from "./Recover.module.css";

class Recover extends Component {
  state = {
    recoverForm: {
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
        valid: true,
        touched: false
      }
    },
    formIsValid: false,
    loading: false,
    confirmation: false,
    error: false,
    errorMessage: ""
  };

  recoverHandler = event => {
    event.preventDefault();

    const queryParams = "?email=" + this.state.recoverForm.email.value;
    this.setState({
      loading: true
    });

    axios
      .post("/retrieve" + queryParams)
      .then(response => {
        this.setState({
          confirmation: true,
          loading: false,
          error: false,
          errorMessage: ""
        });
      })
      .catch(err => {
        this.setState({
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

    if (rules.pattern) {
      isValid = rules.pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedReciverForm = {
      ...this.state.recoverForm
    };

    const updatedFormElement = {
      ...updatedReciverForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    updatedReciverForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedReciverForm) {
      formIsValid = updatedReciverForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      recoverForm: updatedReciverForm,
      formIsValid: formIsValid,
      error: false
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.recoverForm) {
      formElementArray.push({
        id: key,
        config: this.state.recoverForm[key]
      });
    }

    let form = (
      <Aux>
        <h1>Recover account</h1>
        <div className={classes.Description}>
          If you have forgotten your password, a link to the page allowing you
          to set a new password will be sent to the e-mail address provided.
          <br />
          <br />
          If your account is inactive and you have not received the activation
          email, you will receive it again.
        </div>
        <form onSubmit={this.recoverHandler}>
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
          <Button
            btnStyle={"SignInButton"}
            btnType={"Btn3"}
            disabled={!this.state.formIsValid}
          >
            Send
          </Button>
        </form>
      </Aux>
    );

    if (this.state.loading) {
      form = (
        <Aux>
          <Spinner />
          <h1>Waiting ...</h1>
        </Aux>
      );
    }

    if (this.state.confirmation) {
      form = (
        <Feedback title={"Success"} success={true}>
          Message was sent.
          <br />
          <br />
          Check your email and follow the instructions.
        </Feedback>
      );
    }

    return <div className={classes.Recover}>{form}</div>;
  }
}

export default Recover;
