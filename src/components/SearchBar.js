import React, { Component } from 'react';
import './SearchBar.css';

export default class Search extends Component {
  state = { text: '' }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && this.state.text.length > 2) {
      this.props.onSearch(this.state.text)
    }
  }

  render() {
    return (
      <div className="search-bar">
        <input
          className="search-bar-input"
          value={this.state.text}
          onChange={this.handleTextChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    )
  }
}
