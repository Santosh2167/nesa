import React, { Component } from 'react'
import './SideBar.css'
import SearchBar from './SearchBar'
import Icon from './Icon';
import Loading from './Loading';

export default class SideBar extends Component {
  render() {
    const { isLoading, favList } = this.props;

    return (
      <div className="sidebar">
        <div className="icon-title">
          <Icon />
          <div className="sidebar-title">Let's Eat!</div>
        </div>
        <SearchBar onSearch={this.props.onSearch} />
        {isLoading && <Loading />}

        {favList.map(business => (
          <p>
            <a className="popup-title" href={business.url}>{business.name}</a>
          </p>
        ))}
      </div>
    )
  }
}
