import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    to: "",
    current: false,
    description: "",
  });

  //toggles 'to' input area on/off according to current experience or not
  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i className="fas fa-address-card " /> Add any developer/programming
        positions that you have held in the past
      </p>
      <small>* = required field</small>

      {/* form starts here */}
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >

        {/* Job Title */}
        <div class="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        {/* Company */}
        <div class="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        {/* Location */}
        <div class="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* from */}
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* current job checkbox --> disables 'To Date' */}
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Current Job
          </p>
        </div>

        {/* to */}
        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>

        {/* Job Desc */}
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>

        {/* Submit button */}
        <input type="submit" class="btn btn-primary my-1" />
        
        {/* Go back button */}
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
