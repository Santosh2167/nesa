import React, { Component } from 'react'
import debounce from 'lodash.debounce';
import './App.css'
import { searchBusinesses } from './yelpApi'
import Map from './components/Map/Map'
import SideBar from './components/SideBar/SideBar'
import Loader from './components/Loader/Loader'
import Favourites from './modules/Favourites';

const INITIAL_VIEWPORT = {
  center: [-33.872961, 151.208452],
  zoom: 17,
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.favourites = new Favourites();
    this.state = {
      isLoading: false,
      results: [],
      favourites: this.favourites.get(),
      mapCenter: {
        lat: INITIAL_VIEWPORT.center[0],
        lng: INITIAL_VIEWPORT.center[1],
      },
      searchStr: '',
    };
  }

  handleSearch = async (searchStr) => {
    this.setState({ isLoading: true })

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

    if (viewport.zoom > 14) this.handlePanSearch()
  }

  handleAddFav = (business) => {
    const newFavourites = this.favourites.add(business);
    this.setState({ favourites: newFavourites });
  }

  handleDelete = (businessId) => {
    const newFavourites = this.favourites.remove(businessId);
    this.setState({ favourites: newFavourites });
  }

  handlePanSearch = debounce(async () => {
    if (!this.state.searchStr || this.state.searchStr.length < 3) return
    this.setState({ isLoading: true })

    const results = await searchBusinesses(this.state.searchStr, this.state.mapCenter)
    this.setState({ results, isLoading: false })
  }, 300)

  render() {
    return (
      <div className="container">
        <SideBar
          onSearch={this.handleSearch}
          favourites={this.state.favourites}
          handleDelete={this.handleDelete}
        />
        <Map
          initialViewport={INITIAL_VIEWPORT}
          searchResults={this.state.results}
          favourites={this.state.favourites}
          onViewportChanged={this.handleViewportChange}
          handleAddFav={this.handleAddFav}
        />
        {this.state.isLoading && <Loader />}
      </div>
    );
  }
}
