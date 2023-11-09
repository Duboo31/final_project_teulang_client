import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Search() {
  const [searchValue, setSearchValue] = useState(new URLSearchParams(useLocation().search).get("q")); // 검색한 결과를 searchValue로 설정
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${searchValue}`);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <input
        value={searchValue}
        className="search__input"
        type="text"
        onChange={handleChange}
      />
      <button onClick={handleSearch}>G</button>
    </div>
  );
}
