import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import api from "../services/api";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password:''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]:value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password){
            alert('Passwords do not match');
            return;
        }
        try{
            setLoading(true);
            
            const response = await api.post('user/register/',{
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirm_password
            });
            console.log('Registration success: ',response.data);
            alert('Registration successful');
            navigate('/login')
        }catch(error){
            console.error('Registration error: ', error.response?.data || error.message);
            alert(JSON.stringify(error.response?.data) || 'Registration Failed');

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
                  <label htmlFor="confirm_password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm_password"
                    name="confirm_password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              <div className="my-3">
                <div className="d-flex align-items-center mb-3">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 text-muted">OR</span>
                  <hr className="flex-grow-1" />
                </div>
                <a
                  href="http://localhost:8000/accounts/google/login/"
                  className="btn btn-light w-100 border"
                >
                  <img
                    src="https://www.gstatic.com/images/branding/product/1x/googleg_standard_color_128dp.png"
                    alt="Google"
                    style={{ height: "20px", marginRight: "10px" }}
                  />
                  Sign up with Google
                </a>
              </div>
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
