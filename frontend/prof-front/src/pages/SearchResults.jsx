import React, { useState } from "react";
import PropertyCard from "../components/PropertyCard";

const SearchResults = () => {
  const [results, setResults] = useState([]);

  return (
    <div className="container my-5">
        <h1 className="mb-4">Search Results</h1>
        <div className="row g-4">
            {results.length > 0 ? (
                results.map((property) => (
                    <div key={property.id} className="col-md-6 col-lg-4">
                        <PropertyCard property={property} />
                    </div>
                ))
            ) : (
               <div className="col-12">
                    <p className="text-center text-muted fs-5">No properties found</p>
                </div> 
            )}
        </div>
    </div>
  );
};

export default SearchResults;
