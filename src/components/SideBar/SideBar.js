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
        <div className="sidebar-top">
          <img src={logoSvg} className="sidebar-logo" alt="logo" />
          <div className="sidebar-title">Nesa</div>
        </div>
        <SearchBar onSearch={this.props.onSearch} />
        <List favourites={favourites} handleDelete={handleDelete} />
        <div className="sidebar-made-by">Made by Brian Leung</div>
      </div>
    )
  }
}
