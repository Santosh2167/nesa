import React, { Component } from 'react'
import deleteIcon from '../../svg/delete.svg';
import './List.css';
import heartRedSvg from '../../svg/heartRed.svg'

export default class List extends Component {
  render() {
    const { favourites, handleDelete } = this.props

    if (!favourites.length) return null
    return (
      <div className="list">
        <img src={heartRedSvg} alt="heart" className="list-heart" />
        <div className="list-heart-bg" />
        <div className="list-inner">
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
      </div>
    )
  }
}
