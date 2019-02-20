import React, { Component } from 'react'
import './App.css'
import { searchBusinesses } from './yelpApi'
import Map from './components/Map'
import SideBar from './components/SideBar'
import debounce from 'lodash.debounce'

const INITIAL_VIEWPORT = {
  center: [-33.872661, 151.205452],
  zoom: 17,
}

export default class App extends Component {
  state = {
    results: [],
    mapCenter: {
      lat: INITIAL_VIEWPORT.center[0],
      lng: INITIAL_VIEWPORT.center[1],
    },
    searchStr: '',
  }

  handleSearch = async (searchStr) => {
    const results = await searchBusinesses(searchStr, this.state.mapCenter)
    this.setState({ results, searchStr })
  }

  handleViewportChange = (viewport) => {
    this.setState({
      mapCenter: {
        lat: viewport.center[0],
        lng: viewport.center[1],
      },
    })

    this.handlePanSearch()
  }

  handlePanSearch = debounce(async () => {
    const results = await searchBusinesses(this.state.searchStr, this.state.mapCenter)
    this.setState({ results })
  }, 300)

  render() {
    return (
      <div className="container">
        <SideBar onSearch={this.handleSearch} />
        <Map
          searchResults={this.state.results}
          onViewportChanged={this.handleViewportChange}
          initialViewport={INITIAL_VIEWPORT}
        />
      </div>
    );
  }
}
