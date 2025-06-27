import React from "react";

const SearchBar: React.FC = () => (
  <div className="search-bar">
    <input type="text" placeholder="Pesquisar funcionário..." />
    <button className="btn-search"><i className="fas fa-search"></i></button>
  </div>
);

export default SearchBar;