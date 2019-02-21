import React from 'react';
import './List.css';
import Item from '../Item/Item';

export default function List({ favList, handleDelete }) {
  if (!favList.length) {
    return null;
  }
  else {
    return (
      <div className="nesa-fav-list">
        {favList.map(business => (<Item business={business} handleDelete={handleDelete} />))}
      </div>
    )
  }
}