import React, { Component } from "react";
import { Link } from "react-router-dom";
//import ReactTimeout from "react-timeout";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Input from "../../components/UI/Inputs/AnimInput/Input";
import Button from "../../components/UI/Buttons/AnimButton/AnimButton";
import ValidMsg from "../../components/UI/ValidMsg/ValidMsg";
import Loading from "../../components/Loading/Loading";

import * as actions from "../../store/actions/index";

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
    formIsValid: false
  };

  loginHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value
    );
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

        <ValidMsg show={this.props.error} message={this.props.errorMessage} />

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
        <Loading loading={this.props.loading} access={this.props.access} />
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

const mapStateToProps = state => {
  return {
    access: state.auth.access,
    loading: state.auth.loading,
    error: state.auth.error,
    errorMessage: state.auth.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
