import React from "react";

const SearchBox = ({ placeHolder, handleChange, boxType, value }) => (
  <div className="form__group field">
    <input
      className="form__field"
      type={boxType}
      placeholder={placeHolder}
      onChange={handleChange}
      value={value}
    />
    <label for="name" class="form__label">
      {placeHolder}
    </label>
  </div>
);

export default SearchBox;
