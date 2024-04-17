import React from "react";
import { FaSearch } from "react-icons/fa"; // Importing the search icon

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
        style={{ width: "100%", padding: "10px", paddingRight: "30px" }}
      />
      <FaSearch
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
    </div>
  );
};

export default SearchBar;
