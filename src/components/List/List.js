import React from 'react';
import './List.css';

export default function List({ favList }) {
  if (!favList.length) {
    return null;
  }
  else {
    return (
      <div className="nesa-fav-list">
        {favList.map(business => (
          <p className="nesa-fav-list-item">
            <a href={business.url}>{business.name}</a>
          </p>
        ))}
      </div>
    )
  }
}