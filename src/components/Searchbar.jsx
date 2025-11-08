import React from "react";
import { FiSearch } from "react-icons/fi";

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onSearch(event.target.value);
  }

  render() {
    return (
      <div className="searchbar-container">
        <h1 className="title">Notes App</h1>
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Cari catatan..."
            className="search-input"
            value={this.props.searchQuery || ""}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default Searchbar;