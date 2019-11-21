import React from "react";
import PropTypes from "prop-types";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../UI/Backdrop/Backdrop";
import Spinner from "../UI/Spinner/Spinner";
import Logo from "../Logo/Logo";

// import "./Loading.module.css"

const loading = props => (
  <Aux>
    {props.loading ? (
      <Backdrop>
        {!props.access ? (
          <Aux>
            <Spinner />
            <h1>Loading</h1>
          </Aux>
        ) : (
          <Aux>
            <Logo />
            <h1>WELCOME</h1>
          </Aux>
        )}
      </Backdrop>
    ) : null}
  </Aux>
);

loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  access: PropTypes.bool.isRequired
};

export default loading;
