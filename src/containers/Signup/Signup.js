import React, { Component } from "react";
import axios from "../../axios-home";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import ValidMsg from "../../components/UI/ValidMsg/ValidMsg";

import classes from "./Signup.module.css";

class Signup extends Component {
  state = {
    signupForm: {
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
          type: "date"
          // placeholder: "Date"
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
    loading: false,
    error: false,
    errorMessage: "error"
  };

  signupHandler = event => {
    event.preventDefault();
    console.log("elo dołaczyleś do nas");
    const data = {};
    for (let key in this.state.signupForm) {
      if (key !== "repeatPassword")
        data[key] = this.state.signupForm[key].value;
    }

    axios
      .post("/signup", data)
      .then(res => {
        console.log("działa");
        console.log(res);
      })
      .catch(err => {
        let errorMessage = "error";

        // err.response.data.message

        this.setState({
          error: true,
          errorMessage: errorMessage
        });
      });

    console.log(data);
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

    console.log(event.target.value);

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
      formIsValid: formIsValid,
      error: false
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
        <Button
          btnStyle={"SignUpButton"}
          btnType={"Btn2"}
          disabled={!this.state.formIsValid}
        >
          Sign up
        </Button>
      </form>
    );

    return (
      <div className={classes.Signup}>
        <h1>Join to us</h1>
        {form}
      </div>
    );
  }
}

export default Signup;
