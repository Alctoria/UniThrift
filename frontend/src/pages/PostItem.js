import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Map from '../components/Map';

function PostItem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('latitude', location.lat);
    formData.append('longitude', location.lng);

    try {
      await axios.post('/api/items', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      history.push('/');
    } catch (error) {
      console.error('Error posting item:', error);
    }
  };

  return (
    <div>
      <h2>Post New Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Map onLocationSelect={setLocation} />
        <button type="submit">Post Item</button>
      </form>
    </div>
  );
}

export default PostItem;