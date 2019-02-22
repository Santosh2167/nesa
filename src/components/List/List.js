import React, { Component } from 'react'
import deleteIcon from '../../svg/delete.svg';
import './List.css';

export default class List extends Component {
  render() {
    const { favourites, handleDelete } = this.props

    if (!favourites.length) return null
    return (
      <div className="list">
        {favourites.map(business => (
          <div className="list-item" key={business.id}>
            <a
              href={business.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {business.name}
            </a>
            <img
              src={deleteIcon}
              className="delete-btn"
              onClick={() => handleDelete(business.id)}
              alt="delete-icon"
            />
          </div>
        ))}
      </div>
    )
  }
}
