import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

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
          // required: true,
          // minLength: 1
        },
        valid: true,
        touched: false
      }
    },
    formIsValid: false,
    loading: false
  };

  recoverHandler = event => {
    event.preventDefault();
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedReciverForm = {
      ...this.state.recoverForm
    };

    const updatedFormElement = {
      ...updatedReciverForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;

    // updatedFormElement.valid = this.checkValidity(
    //   updatedFormElement.value,
    //   updatedFormElement.validation
    // );

    updatedFormElement.touched = true;

    updatedReciverForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedReciverForm) {
      formIsValid = updatedReciverForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      recoverForm: updatedReciverForm,
      formIsValid: formIsValid
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
        <Button
          btnStyle={"SignInButton"}
          btnType={"Btn3"}
          disabled={!this.state.formIsValid}
        >
          Send
        </Button>
      </form>
    );

    return (
      <div className={classes.Recover}>
        <h1>Remind password</h1>
        <div className={classes.Description}>
          If you have forgotten your password, a link to the page allowing you
          to set a new password will be sent to the e-mail address provided.
          <br />
          <br />
          If your account is inactive and you have not received the activation
          email, you will receive it again.
        </div>
        {form}
      </div>
    );
  }
}

export default Recover;
