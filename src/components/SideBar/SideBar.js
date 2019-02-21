import React, { Component } from 'react'
import '../SideBar/SideBar.css'
import SearchBar from '../SearchBar/SearchBar'
import Icon from '../Icon/Icon';
import Loading from '../Loading/Loading';
import List from '../List/List';

export default class SideBar extends Component {
  render() {
    const { isLoading, favList } = this.props;

    return (
      <div className="sidebar">
        <div className="icon-title">
          <Icon />
          <div className="sidebar-title">Brian!</div>
        </div>
        <SearchBar onSearch={this.props.onSearch} />
        {isLoading && <Loading />}
        <List favList={favList} />
      </div>
    )
  }
}
