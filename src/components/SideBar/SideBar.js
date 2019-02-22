import React, { Component } from 'react'
import './SideBar.css'
import SearchBar from '../SearchBar/SearchBar'
import List from '../List/List';
import logoSvg from '../../svg/logo.svg';

export default class SideBar extends Component {
  render() {
    const { favourites, handleDelete } = this.props;

    return (
      <div className="sidebar">
        <div className="icon-title">
          <img src={logoSvg} className="logo" alt="logo" />
          <div className="sidebar-title">Nesa</div>
        </div>
        <SearchBar onSearch={this.props.onSearch} />
        <List favourites={favourites} handleDelete={handleDelete} />
      </div>
    )
  }
}
