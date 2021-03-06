import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import DashboardActions from "./DashboardActions";
import Spinner from "../layout/Spinner";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  //if profile not loaded yet --> show spinner
  return loading && profile === null ? (
    <Spinner />
  ) : ( //else --> show dashboard
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="far fa-user"></i> Welcome {user && user.name}
      </p>
      {profile != null ? (
        //if profile for user exists
        <Fragment>
          {/* edit profile, add experience, add education */}
          <DashboardActions />

          {/* experience credentials */}
          <Experience experience={profile.experience} />

          {/* education credentials */}
          <Education education={profile.education} />

          {/* delete account button */}
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i class="far fa-trash-alt"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        //if profile does not exist
        <Fragment>
          <p>You have not created your profile yet, let's take care of that</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
