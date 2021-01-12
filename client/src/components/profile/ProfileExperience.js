import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <div>
      {/* Company */}
      <h3 className="text-dark">{company}</h3>

      {/* to & from date */}
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? "Present" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>

      {/* Position */}
      <p>
        <strong>Position: </strong> {title}
      </p>

      {/* Description */}
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
