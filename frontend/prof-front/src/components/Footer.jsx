import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <div className="container-fluid">
        <p className="mb-2">&copy; 2026 Property. All rights reserved.</p>
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            <Link className="text-white text-decoration-none" to="/">
              Home
            </Link>
          </li>
          <li className="list-inline-item ms-3">
            <Link className="text-white text-decoration-none">
              Search
            </Link>
          </li>
          <li className="list-inline-item ms-3">
            <Link className="text-white text-decoration-none">
              Add Property
            </Link>
          </li>
          <li className="list-inline-item ms-3">
            <Link className="text-white text-decoration-none">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
