import React, { Component } from "react";
import axios from "../../../axios-home";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import classes from "./Confirmtion.module.css";

export class Confirmation extends Component {
  state = {
    redirect: false,
    loading: true,
    error: false,
    errorMessage: ""
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let email = "";
    for (let param of query.entries()) {
      if (param[0] === "email") {
        console.log(param[1]);
        email = param[1];
      }
    }

    if (email !== "") {
      this.confirmAccountHandler(email);
    } else {
      this.setState({
        redirect: true,
        loading: false,
        error: true,
        errorMessage: "Bad address !!"
      });
    }
  }

  confirmAccountHandler = (email) => {
    const queryParams = "?email=" + email;
    axios.put("/signup/confirm" + queryParams)
      .then(response => {
        console.log(response);
        this.setState({
          redirect: true,
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
  }

  redirectToLoginHandler = () => {
    setTimeout(() => {
      this.props.history.replace("/");
    }, 5000);
  }

  render() {

    if (this.state.redirect) {
      this.redirectToLoginHandler();
    }

    let view = null;

    if (this.state.loading) {
      view = (
        <Aux>
          <Spinner />
          <h1>Waiting</h1>
        </Aux>
      );
    }

    if (!this.state.loading && !this.state.error) {
      view = (
        <h1> gratulacje </h1>
      )
    }

    if (this.state.error) {
      view = (
        <h1> {this.state.errorMessage} </h1>
      )
    }

    return (
      <div className={classes.Confirmation}>
        {view}
      </div>
    )
  }
}

export default Confirmation
