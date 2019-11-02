import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTimeout from "react-timeout";

import axios from "../../axios-home";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import ValidMsg from "../../components/UI/ValidMsg/ValidMsg";

import classes from "./Signin.module.css";

class Signin extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email"
        },
        label: "E-Mail",
        value: "",
        validation: {
          required: true,
          minLength: 1
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
          minLength: 1
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    loading: false,
    access: false,
    error: false,
    errorMessage: ""
  };

  loginHandler = event => {
    event.preventDefault();

    this.setState({
      loading: true,
      access: false,
      error: false
    });

    // this.props.setTimeout(() => {
    //   this.setState({
    //     loading: false
    //   });
    // }, 3000);

    axios
      .post(
        "/oauth/token?grant_type=password&username=" +
          this.state.loginForm.email.value +
          "&password=" +
          this.state.loginForm.password.value,
        {},
        {
          headers: {
            authorization:
              "Basic ZmlzaGxvZ2NsaWVudGlkOlptbHphR3h2WnkxaVlXTnJaVzVrTFdGd2NHeHBZMkYwYVc5dURRbw=="
          }
        }
      )
      .then(res => {
        this.setState({
          access: true
        });
        this.props.setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 3000);
      })
      .catch(err => {
        const status = err.response.status;

        let errmsg = "Unknown problem, sorry :(";
        if (status === 401) {
          errmsg = "Valid mail :(";
        }
        if (status === 400) {
          errmsg = "Valid password :(";
        }

        this.setState({
          loading: false,
          error: true,
          errorMessage: errmsg
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

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedLoginForm = {
      ...this.state.loginForm
    };

    const updatedFormElement = {
      ...updatedLoginForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    updatedLoginForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedLoginForm) {
      formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      loginForm: updatedLoginForm,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.loginForm) {
      formElementArray.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }

    let form = (
      <form onSubmit={this.loginHandler}>
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
          Sign in
        </Button>
      </form>
    );

    return (
      <Aux>
        {this.state.loading ? (
          <Backdrop>
            {!this.state.access ? (
              <Aux>
                <Spinner />
                loading
              </Aux>
            ) : (
              <h1>WELCOME</h1>
            )}
          </Backdrop>
        ) : null}
        <div className={classes.Signin}>
          <h1>Login</h1>
          {form}
          <div className={classes.Links}>
            <Link to={"/recover"} className={classes.Link}>
              Forgot Password
            </Link>
          </div>
          <div className={classes.Or}>
            <hr className={classes.Bar} />
            <span>OR</span>
            <hr className={classes.Bar} />
          </div>
          <Link
            to={"/signup"}
            style={{
              width: "60%"
            }}
          >
            <Button btnStyle={"SignUpButton"} btnType={"Btn2"}>
              Create an account
            </Button>
          </Link>
        </div>
      </Aux>
    );
  }
}

export default ReactTimeout(Signin);
