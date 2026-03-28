import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={property.images?.[0]?.image}
        className="card-img-top"
        alt={property.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{property.title}</h5>
        <p className="card-text text-muted">{property.description}</p>
        <p>
          <strong className="text-success">Tk.{property.price}</strong>
        </p>
        <p className="card-text small text-muted">
          {property.location.area}, {property.location.city}
        </p>
        <Link
          to={token || user ? `property/${property.id}` : "/login"}
          className="btn btn-primary btn-sm w-100"
        >
        View Details
        </Link>
        {/* {user ? (
          <Link to={`property/${property.id}`} className="btn btn-primary btn-sm w-100">View Details</Link>
        ) : (
          navigate('/login')
        )} */}
        
      </div>
    </div>
  );
};

export default PropertyCard;
