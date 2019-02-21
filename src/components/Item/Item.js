import React, { Component } from 'react'


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
        <button onClick={this.onDelete}>x</button>
        <a href={business.url}>{business.name}</a>
      </p>
    )
  }
}
