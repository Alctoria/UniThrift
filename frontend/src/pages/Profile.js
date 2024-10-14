import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';

function Profile() {
  const [userItems, setUserItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchUserItems();
    }
  }, [user]);

  const fetchUserItems = async () => {
    try {
      const response = await axios.get('/api/items/user', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setUserItems(response.data);
    } catch (error) {
      console.error('Error fetching user items:', error);
    }
  };

  return (
    <div>
      <h2>My Profile</h2>
      <h3>My Items</h3>
      <div className="user-items">
        {userItems.map(item => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Profile;