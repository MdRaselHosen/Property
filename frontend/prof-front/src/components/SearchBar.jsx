import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchBar = () => {

    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({});

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query, filters);
    };
    
  return (
    <form className='mb-4' onSubmit={handleSearch}>
        <div className='input-group'>
            <input 
                type='text'
                className='form-control'
                placeholder='Search Properties'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className='btn btn-primary' type='submit'>
                Search
            </button>
        </div>
    </form>
  )
}

export default SearchBar
