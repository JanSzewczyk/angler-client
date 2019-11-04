import React from 'react'
import PropTypes from 'prop-types';

import Aux from "../../hoc/Auxiliary/Auxiliary"
import Backdrop from "../UI/Backdrop/Backdrop";
import Spinner from "../UI/Spinner/Spinner";

const loading = props => (
	<Aux>
		{
			props.loading ? (
				<Backdrop>
					{!props.access ? (
						<Aux>
							<Spinner />
							loading
                </Aux>
					) : (
							<h1>WELCOME</h1>
						)}
				</Backdrop>
			) : null
		}
	</Aux>
)

loading.propTypes = {
  loading: PropTypes.bool,
  access: PropTypes.bool
};

export default loading;


