import React, { Component } from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import Marker from './Marker'
import './Map.css';

const ACCESS_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
// const ACCESS_TOKEN = 'pk.eyJ1IjoiYnJpYW5obWxldW5nIiwiYSI6ImNqczhsdmJ0YTA5cDU0M3FrODJ0NGhicmoifQ.SGMvdUSnN0s1olr0HFk0KA'

export default class Map extends Component {
  mapRef = React.createRef()

  render() {
    const {
      searchResults,
      favourites,
      onViewportChanged,
      initialViewport,
      handleAddFav,
    } = this.props

    const alreadyRendered = []
    return (
      <LeafletMap
        viewport={initialViewport}
        ref={this.mapRef}
        style={{ height: '100vh' }}
        animate={true}
        onViewportChanged={onViewportChanged}
      >
        <TileLayer
          // id="streets-v11"
          id="light-v10"
          tileSize={512}
          zoomOffset={-1}
          url={`https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`}
        />
        {favourites.map(business => {
          alreadyRendered.push(business.id)
          return (
            <Marker
              key={business.id}
              business={business}
              handleAddFav={handleAddFav}
            />
          )
        })}
        {searchResults.map(business => {
          if (alreadyRendered.indexOf(business.id) > -1) return null
          return (
            <Marker
              key={business.id}
              business={business}
              handleAddFav={handleAddFav}
            />
          )
        })}
      </LeafletMap>
    )
  }
}
