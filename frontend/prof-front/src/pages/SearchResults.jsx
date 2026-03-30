import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import api from "../services/api";
import { useSearchParams } from "react-router-dom";
import axios from "axios";


const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
        api.get(`property/?search=${query}`)
        .then((res) => {
            setResults(res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }
  },[query]);

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
