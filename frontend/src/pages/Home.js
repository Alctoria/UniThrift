import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSearch = async (location, distance) => {
    try {
      const response = await axios.get(`/api/items/search?latitude=${location.lat}&longitude=${location.lng}&distance=${distance}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  return (
    <div>
      <h1>Items for Sale</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="item-list">
        {items.map(item => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;