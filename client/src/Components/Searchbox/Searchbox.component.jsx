import React from "react";

const SearchBox = ({ placeHolder, handleChange }) => (
  <input
    className="search"
    type="search"
    placeholder={placeHolder}
    onChange={handleChange}
  />
);

export default SearchBox;
