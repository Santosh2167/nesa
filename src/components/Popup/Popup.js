import React, { Component } from 'react'
import { Popup as LeafletPopup } from 'react-leaflet'
import '../Popup/Popup.css'

const Ratings = ({ business }) => {
  const stars = []

  const filled = Math.floor(business.rating)
  const empty = Math.floor(5 - business.rating)
  const hasHalf = empty !== (5 - business.rating)

  Array.from(Array(filled)).forEach((val, index) => {
    stars.push(<i className="fas fa-star" key={`${index}-filled`} />)
  })

  if (hasHalf) stars.push(<i className="fas fa-star-half-alt" key="half" />)

  Array.from(Array(empty)).forEach((val, index) => {
    stars.push(<i className="far fa-star" key={`${index}-empty`} />)
  })

  return (
    <div className="popup-ratings">
      <span className="popup-ratings-stars">{stars}</span>
      ({business.review_count})
    </div>
  )
}

export default class Popup extends Component {

  onAddFav = () => {
    const { business, handleAddFav } = this.props;
    if (handleAddFav) {
      handleAddFav(business)
    }
  }

  render() {
    const { business } = this.props;

    return (
      <LeafletPopup closeButton={false} autoPan={false}>
        <a className="popup-title" href={business.url}>{business.name}</a>
        <div className="popup-categories">
          {business.categories.map(category => category.title).join(' / ')}
        </div>
        {business.image_url &&
          <div className="popup-thumbnail">
            <img src={business.image_url} alt={business.name} />
          </div>
        }
        <a href={`tel:${business.phone}`}>{business.display_phone}</a>
        <Ratings business={business} />
        <a onClick={this.onAddFav}>Add</a>
        <strong className="popup-price">{business.price}</strong>
      </LeafletPopup>
    )
  }
}
