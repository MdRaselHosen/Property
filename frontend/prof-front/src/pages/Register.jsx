import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword:''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]:value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password != formData.confirmPassword){
            alert('Passwords do not match');
            return;
        }
        try{
            setLoading(true);
            
            const response = await axios.post('http://127.0.0.1:8000/api/register/',{
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            console.log('Registration success: ',response.data);
            alert('Registration successful');
            navigate('/login')
        }catch(error){
            console.error('Registration error: ', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Registrarion Failed');

        }finally{
            setLoading(false);
        }
    }
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
