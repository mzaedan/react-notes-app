import React from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const searchTerm = event.target.value;
    this.props.onSearchChange(searchTerm);
    
    const url = new URL(window.location);
    if (searchTerm) {
      url.searchParams.set('search', searchTerm);
    } else {
      url.searchParams.delete('search');
    }
    window.history.replaceState({}, '', url);
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
            value={this.props.searchTerm || ""}
            onChange={this.handleChange}
          />
        </div>
        <div className="add-button">
          <Link to="/add">
            <button className="add-note-button">Tambah Catatan</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Searchbar;