import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [owner, SetOwner] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const res = await api.get(`property/${id}/`);
      setProperty(res.data);

      if (res.data.owner) {
        try {
          const ownerRes = await api.get(`user/${res.data.owner}/`);
          SetOwner(ownerRes.data);
        } catch (error) {
          console.error("Can't get owner info", error);
        }
      }
    } catch (error) {
      console.log("Can't get Property ", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevImage = () => {
    if (property?.images && property.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1,
      );
    }
  };

  const handleNextImage = () => {
    if (property?.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
    }
  }

  if (loading || !property)
    return <p className="text-center mt-5">Loading...</p>;

  const currentImage =
    property.images && property.images.length > 0
      ? property.images[currentImageIndex]
      : null;

  return (
    <div>
      <div className="container my-5">
        {property ? (
          <>
            <div className="row mb-5">
              <div className="col-md-8">
                <h1 className="mb-4">{property.title}</h1>

                <div className="position-relative mb-4">
                  {currentImage ? (
                    <img
                      src={currentImage.image}
                      alt={property.title}
                      className="img-fluid rounded"
                      style={{
                        height: "400px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  ) : (
                    <div className="bg-light rounded p-5 text-center">
                      <p>No images available</p>
                    </div>
                  )}

                  {property.images && property.images.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-2"
                        style={{ zIndex: 10}}
                      >
                      ❮
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="btn btn-light position-absolute top-50 end-0 translate-middle me-2"
                        style={{ zIndex: 10 }}
                      >
                        ❯
                      </button>
                    </>
                  )}
                </div>

                {property.images && property.images.length > 1 && (
                  <div className="d-flex gap-2 mb-4 overflow-auto">
                    {property.images.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img.image}
                        alt={`Thumbnail ${idx + 1}`}
                        className={`rounded cursor-pointer ${
                          currentImageIndex === idx ? "border-3 border-primary" : ""
                        }`}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          cursor: "pointer",
                          opacity: currentImageIndex === idx ? 1 : 0.6
                        }}
                        onClick={() => setCurrentImageIndex(idx)}
                      />
                    ))}
                  </div>
                )}

                <div className="mb-4">
                  <p className="lead">{property.description}</p>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p className="fs-4">
                        <strong>
                          Price:{" "}
                          <span className="text-success">Tk.{property.price}</span>
                        </strong>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="fs-5">
                        <strong>Type: </strong>
                        <span className="badge bg-info">{property.property_type || "Not Specific"}</span>
                      </p>
                    </div>
                  </div>
                  <p className="fs-5 mb-3">
                    <strong>Location: </strong>
                    {property.location?.area && property.location?.city
                      ? `${property.location.area}, ${property.location.city}`
                      : "Location not specified"}
                  </p>

                </div>
              </div>

              <div className="col-md-4">
                {owner && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title mb-3">Owner Information</h5>
                      <div className="d-flex aligh-items-center mb-3">
                        <div className="bg-primary text-white rounded-circle p-3 me-3"
                          style={{width: "60px", height:"60px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                          
                          {owner.first_name?.charAt(0) || owner.email?.charAt(0)}

                        </div>
                        <div>
                          <h6 className="mb-0">{owner.first_name} {owner.last_name}</h6>
                          <small className="text-muted">{owner.email}</small>
                        </div>
                      </div>
                      <button className="btn btn-primary w-100">Contact Owner</button>
                    </div>
                  </div>
                )}

                {(property.latitude && property.longitude) && (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title mb-3">Location on Map</h5>
                      <div className="ratio ratio-16x9 mb-3">
                        <iframe
                          title="property-location"
                          src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.01},${property.latitude - 0.01},${property.longitude + 0.01},${property.latitude + 0.01}&layer=mapnik&marker=${property.latitude},${property.longitude}`}
                          style={{ border: 0, borderRadius: "8px"}}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        >
                        </iframe>
                      </div>
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${property.latitude}&mlon=${property.longitude}&zoom=15`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm w-100"
                      >
                        View on OpenStreetMap
                      </a>
                      <p className="text-muted small mt-2 text-center">
                        {property.latitude}, {property.longitude}
                      </p>
                    </div>
                  </div>
                )}


                {!property.latitude && (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Location on Map</h5>
                      <p className="text-muted">Map Location not available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="alert alert-warning">Property Not Found</div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
