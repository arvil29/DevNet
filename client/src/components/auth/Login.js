import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  //makes sure we can type in text boxes
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //makes sure we can submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //If logged in --> redirect to dashboard (can't access login/register pages)
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i class="fas fa-sign-in-alt"></i> Sign into your account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </Fragment>
  );
};

//must have these props in Login
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

//connected component needs this part of data from store
//called any time store state changes
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

//connect(mapStateToProps, mapDispatchToProps)
export default connect(mapStateToProps, { login })(Login);
