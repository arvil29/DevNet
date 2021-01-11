import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest //take remaining props & store in rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      //if not authenticated & loading --> login page
      return !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        //else --> go to whichever component specified
        <Component {...props} />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
