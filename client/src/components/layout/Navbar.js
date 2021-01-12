import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; //connect react component to redux store
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //for users logged in
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="far fa-user"></i> Dashboard
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <i className="fab fa-connectdevelop"></i> Developers
        </Link>
      </li>
      <li>
        <Link to="/posts">
          {" "}
          <i class="far fa-comments"></i> Posts
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    </ul>
  );

  //for guest users w/o account
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fab fa-connectdevelop"></i> Developers
        </Link>
      </li>
      <li>
        <Link to="/register">
          <i class="far fa-plus-square"></i> Register
        </Link>
      </li>
      <li>
        <Link to="/login">
          {" "}
          <i class="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-terminal"></i> DevNet
        </Link>
      </h1>
      {!loading && (
        //if logged in --> show one type of navbar (authLinks)
        //if not --> show another (guestLinks)
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment> 
      )}
    </nav>
  );
};

//make sure these props are passed into Navbar
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
