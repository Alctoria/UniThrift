import React from 'react';

function ItemCard({ item }) {
  return (
    <div className="item-card">
      <img src={item.imageUrl} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
    </div>
  );
}

export default ItemCard;