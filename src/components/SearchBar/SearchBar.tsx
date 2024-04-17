import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
        className={styles.inputSearch}
      />
      <FaSearch
       className={styles.searchIcon}
      />
    </div>
  );
};

export default SearchBar;
