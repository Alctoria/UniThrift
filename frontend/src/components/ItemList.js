import { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import SearchBar from './SearchBar';
import { searchItems } from '../utils/api';

const ItemList = () => {
  const [items, setItems] = useState([]);

  const handleSearch = async (location, distance) => {
    const result = await searchItems(location, distance);
    setItems(result);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {items.map(item => <ItemCard key={item.id} item={item} />)}
    </div>
  );
};