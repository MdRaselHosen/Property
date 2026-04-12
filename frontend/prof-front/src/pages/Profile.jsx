import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = authUser && authUser.id == id;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await api.get(`user/${id}/`);
        const data = response.data.results || response.data;
        setProfileUser(data);
      } catch (error) {
        console.error("Error fetching user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);
  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await api.delete(`property/${propertyId}/`);
        // Refetch user data to update the list
        const response = await api.get(`user/${id}/`);
        const data = response.data.results || response.data;
        setProfileUser(data);
        alert("Property deleted successfully");
      } catch (error) {
        console.error("Error deleting property", error);
        if (error.response?.status === 401) {
          alert("Unauthorized: Please login again");
        } else if (error.response?.status === 403) {
          alert("Forbidden: You are not the owner of this property");
        } else {
          alert("Error deleting property: " + error.message);
        }
      }
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!profileUser) return <p className="text-center mt-5">User not found</p>;

  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <div className="row mb-5">
        <div className="col-md-8">
          <h1>{profileUser.first_name} {profileUser.last_name}</h1>
          <p className="text-muted">Email: {profileUser.email}</p>
          {isOwnProfile && (
            <button className="btn btn-primary me-2">Edit Profile</button>
          )}
        </div>
        <div className="col-md-4 text-end">
          {isOwnProfile && (
            <button 
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <h2 className="mb-4">Properties Posted</h2>
      {!profileUser.properties || profileUser.properties.length === 0 ? (
        <p className="alert alert-info">No properties listed</p>
      ) : (
        <div className="row">
          {profileUser.properties.map((property) => (
            <div key={property.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text text-muted">{property.description}</p>
                  <p className="fs-5"><strong>Tk.{property.price}</strong></p>
                  {isOwnProfile && (
                    <div className="d-flex gap-2">
                      <button className="btn btn-warning btn-sm">Edit</button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
