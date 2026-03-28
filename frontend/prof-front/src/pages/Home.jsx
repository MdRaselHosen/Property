import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import api from "../services/api";

const Home = () => {
  const [properties, setProperties] = useState([]);

  const handleSearch = (query, filters) => {
    console.log("Searching for:", query, filters);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("property/");
        
        
        const data = response.data.results || response.data;

        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-4 mb-4">
          Welcome to Property Sites
        </h1>

        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="row g-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="col-md-6 col-lg-4">
              <PropertyCard property={property} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-muted fs-5">
              No Properties available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;