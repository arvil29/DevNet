import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    to: "",
    current: false,
    description: "",
  });

  //toggles 'to' input area on/off according to current experience or not
  const [toDateDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class="large text-primary">Add Your Education</h1>
      <p class="lead">
        <i className="fas fa-graduation-cap" /> Add any school or bootcamp you
        have attended
      </p>
      <small>* = required field</small>

      {/* form starts here */}
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        {/* School */}
        <div class="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        {/* Degree */}
        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        {/* Field of study */}
        <div class="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
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

        {/* Program desc */}
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
