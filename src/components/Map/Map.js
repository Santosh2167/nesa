import React, { Component } from 'react'
import Leaflet from 'leaflet'
import { Map, TileLayer, Marker } from 'react-leaflet'
import Popup from '../Popup/Popup'
import mapIconSvg from '../../svg/map.svg'
import '../Map/Map.css'

const ACCESS_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
// const ACCESS_TOKEN = 'pk.eyJ1IjoiYnJpYW5obWxldW5nIiwiYSI6ImNqczhsdmJ0YTA5cDU0M3FrODJ0NGhicmoifQ.SGMvdUSnN0s1olr0HFk0KA'

const MapIcon = new Leaflet.Icon({
  iconUrl: mapIconSvg,
  iconSize: [25, 55],
  popupAnchor: [0, -35],
})

export default class MapComponent extends Component {
  mapRef = React.createRef()

  render() {
    const {
      searchResults,
      favList,
      onViewportChanged,
      initialViewport,
      handleAddFav,
    } = this.props

    return (
      <Map
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
        {searchResults.map(business => {
          const isFavourite = favList.some(fav => fav.id === business.id);
          return (
            <Marker
              key={business.id}
              position={{
                lat: business.coordinates.latitude,
                lng: business.coordinates.longitude,
              }}
              icon={MapIcon}
              riseOnHover
              className={isFavourite ? 'favourite' : null}
            >
              <Popup
                handleAddFav={handleAddFav}
                business={business}
                isFavourite={isFavourite}
              />
            </Marker>
          )
        })}
      </Map>
    )
  }
}
