import React from "react";

const SearchBox = ({ placeHolder, handleChange, boxType, value }) => (
  <input
    className="search"
    type={boxType}
    placeholder={placeHolder}
    onChange={handleChange}
    value={value}
  />
);

export default SearchBox;
