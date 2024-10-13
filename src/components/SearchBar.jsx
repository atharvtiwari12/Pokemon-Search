import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      className={styles.searchBar}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search for Pokemon"
    />
  );
}

export default SearchBar;
