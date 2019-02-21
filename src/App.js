import React, { Component } from 'react'
import './App.css'
import { searchBusinesses } from './yelpApi'
import Map from './components/Map/Map'
import SideBar from './components/SideBar/SideBar'
import debounce from 'lodash.debounce';

const LOCAL_STORAGE_KEY = 'favourites';

const INITIAL_VIEWPORT = {
  center: [-33.872661, 151.205452],
  zoom: 17,
}

export default class App extends Component {
  constructor() {
    super();

    this.localStorageFavs = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  state = {
    isLoading: false,
    results: [],
    favList: this.localStorageFavs ? JSON.parse(this.localStorageFavs) : [],
    mapCenter: {
      lat: INITIAL_VIEWPORT.center[0],
      lng: INITIAL_VIEWPORT.center[1],
    },
    searchStr: '',
  }

  handleSearch = async (searchStr) => {
    this.setState({ isLoading: true });
    const results = await searchBusinesses(searchStr, this.state.mapCenter)
    this.setState({ results, searchStr, isLoading: false })
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

  handleAddFav = (business) => {
    const favList = this.state.favList;
    favList.push(business);
    this.setState({ favList })
  }

  handlePanSearch = debounce(async () => {
    this.setState({
      isLoading: true,
    })
    const results = await searchBusinesses(this.state.searchStr, this.state.mapCenter)
    this.setState({ results, isLoading: false })
  }, 300)

  render() {
    return (
      <div className="container">
        <SideBar
          isLoading={this.state.isLoading}
          onSearch={this.handleSearch}
          favList={this.state.favList}
        />
        <Map
          handleAddFav={this.handleAddFav}
          searchResults={this.state.results}
          onViewportChanged={this.handleViewportChange}
          initialViewport={INITIAL_VIEWPORT}
        />
      </div>
    );
  }
}
