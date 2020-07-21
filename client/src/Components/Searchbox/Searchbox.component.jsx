import React from "react";

const SearchBox = ({ placeHolder, handleChange, boxType, value, name }) => (
  <div className="form__group field">
    <input
      name={name}
      className="form__field"
      type={boxType}
      placeholder={placeHolder}
      onChange={handleChange}
      value={value}
    />
    <label class="form__label">{placeHolder}</label>
  </div>
);

export default SearchBox;
