import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Search() {
  const [searchValue, setSearchValue] = useState(""); // 검색한 결과를 searchValue로 설정
  const navigate = useNavigate();
  const inputValue = new URLSearchParams(useLocation().search).get("q");

  // url에 있는 검색어와 input 창에 뜬 검색어와 동일하게 유지.
  useEffect(() => { 
    if(inputValue) {
      setSearchValue(inputValue); 
    } else {
      setSearchValue("");
    }
  }, [inputValue]);

  // 검색어 입력 시 검색어 url로 넘겨서 보냄.
  const handleSearch = () => { 
    navigate(`/search?q=${searchValue}&page=1`);
  };

  // input에 입력될 때마다 serachValue값 변경
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
