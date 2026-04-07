import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api';

const Profile = () => {

  const { id } = useParams();
  const [user, setUser] = useState(null);

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
  if (!user) return <p>Loading...</p>
  return (
    <div>
      <h3>Profile page</h3>
    </div>
  )
}

export default Profile
