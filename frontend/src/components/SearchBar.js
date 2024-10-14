import React, { useState } from 'react';
import Map from './Map';

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location && distance) {
      onSearch(location, distance);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Map onLocationSelect={setLocation} />
      <input
        type="number"
        placeholder="Distance (km)"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;