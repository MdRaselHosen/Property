import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api';

const Profile = () => {

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isOwnProfile = currentUser && currentUser.id == id;

  useEffect(() =>{
    const fetchUser = async () => {
      try{
        const response = await api.get(`user/${id}/`);
        const data = response.data.results || response.data;
        setUser(data);

      }catch (error){
        console.error("Error fetching user", error);
      }
    };
    fetchUser();

  }, [id]);
  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        console.log('Attempting to delete property:', propertyId);
        console.log('Current token:', localStorage.getItem('token'));
        await api.delete(`property/${propertyId}/`);
        // Refetch user data to update the list
        const response = await api.get(`user/${currentUser.id}/`);
        const data = response.data.results || response.data;
        setUser(data);
        alert('Property deleted successfully');
      } catch (error) {
        console.error('Error deleting property', error);
        if (error.response?.status === 401) {
          alert('Unauthorized: Please login again');
        } else if (error.response?.status === 403) {
          alert('Forbidden: You are not the owner of this property');
        } else {
          alert('Error deleting property: ' + error.message);
        }
      }
    }
  };

  if (!user) return <p>Loading...</p>
  return (
    <div style={{ maxWidth: "900px", margin:"auto"}}>
      <div style={{ borderBottom: "1px solid #ccc", marginBottom: "20px "}}>
        <h1>{user.username}</h1>
        <p>Email: {user.email}</p>
        {isOwnProfile && <button className="btn btn-primary">Edit Profile</button>}
      </div>

      <h2>Properties Posted</h2>
      {!user.properties || user.properties.length === 0 ? (
        <p>No properties listed</p>
      ) : (
        user.properties.map(property => (
          <div
            key={property.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px"
            }}
          > 
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <strong>${property.price}</strong>
            {isOwnProfile && (
              <div style={{ marginTop: "10px" }}>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProperty(property.id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default Profile
