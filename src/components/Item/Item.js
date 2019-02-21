import React, { Component } from 'react';
import deleteIcon from '../../svg/delete.svg';
import '../Item/Item.css'


export default class Item extends Component {
  onDelete = () => {
    const { business, handleDelete } = this.props;
    if (handleDelete) {
      handleDelete(business.id)
    }
  }

  render() {
    const { business } = this.props;

    return (
      <p className="nesa-fav-list-item">
        <img src={deleteIcon} className="nesa-delete-btn" onClick={this.onDelete} alt="delete-icon" />
        <a href={business.url}>{business.name}</a>
      </p>
    )
  }
}
