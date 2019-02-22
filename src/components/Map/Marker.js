import React, { Component } from 'react'
import Leaflet from 'leaflet'
import { Marker as LeafletMarker } from 'react-leaflet'
import Popup from '../Popup/Popup'
import mapIconSvg from '../../svg/map.svg'
import mapIconRedSvg from '../../svg/mapRed.svg'

const getMapIcon = (business) => new Leaflet.Icon({
  iconUrl: business.favourite ? mapIconRedSvg : mapIconSvg,
  iconSize: [25, 55],
  popupAnchor: [0, -35],
})

export default class Marker extends Component {
  render() {
    const { business, handleAddFav } = this.props

    return (
      <LeafletMarker
        position={{
          lat: business.coordinates.latitude,
          lng: business.coordinates.longitude,
        }}
        icon={getMapIcon(business)}
        riseOnHover
      >
        <Popup handleAddFav={handleAddFav} business={business} />
      </LeafletMarker>
    )
  }
}
