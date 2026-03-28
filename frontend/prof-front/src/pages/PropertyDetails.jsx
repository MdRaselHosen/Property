import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await api.get(`property/${id}/`);
      setProperty(res.data);
    } catch (error) {
      console.error("Can't get property ", error);
    }
  };
  if (!property) return <p>Loading...</p>;
  return (
    <div>
      <div className="container my-5">
        {property ? (
          <div className="row">
            <div className="col-md-8">
              <h1 className="mb-3">{property.title}</h1>
              <img
                src={property.image}
                alt={property.title}
                className="img-fluid mb-3 rounded"
              />
              <p className="lead">{property.description}</p>
              <p className="fs-4">
                <strong>
                  Price:{" "}
                  <span className="text-success">Tk.{property.price}</span>
                </strong>
              </p>
              <p className="fs-5">
                <strong>Location: </strong>
                {property.location.area} {property.location.city}
              </p>
              <button className="btn btn-primary btn-lg">Contact Owner</button>
            </div>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Google Map</h5>
                        <p className="card-text">See the property location in Google map.</p>
                    </div>
                </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-warning">Property Not Found</div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
