import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// css
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchImageModal from "./SearchImageModal";

export default function Search({ setIsNaviActive }) {
  const [searchValue, setSearchValue] = useState(""); // 검색한 결과를 searchValue로 설정
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const inputValue = new URLSearchParams(useLocation().search).get("q");

  // url에 있는 검색어와 input 창에 뜬 검색어와 동일하게 유지.
  useEffect(() => {
    if (inputValue) {
      setSearchValue(inputValue);
    } else {
      setSearchValue("");
    }
  }, [inputValue]);

  // 검색어 입력 시 검색어 url로 넘겨서 보냄.
  const handleSearch = () => {
    navigate(`/search?q=${searchValue}&page=1`);
    setIsNaviActive((cur) => !cur);
  };

  const handleClickImageSearch = () => {
    setModalOpen(true);
  }

  // input에 입력될 때마다 serachValue값 변경
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="searchBar-wrap">
      <input
        value={searchValue}
        className="search__input"
        type="text"
        onChange={handleChange}
        placeholder="요리 재료 검색"
      />
      <button className="search__btn" onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <button onClick={handleClickImageSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      <div>
        {modalOpen && (
          <SearchImageModal
            setModalOpen={setModalOpen}
            searchValue={searchValue}
            setIsNaviActive={setIsNaviActive}
          />
        )}
      </div>
    </div>
  );
}
