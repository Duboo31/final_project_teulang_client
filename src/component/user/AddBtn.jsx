import React from "react";

const AddBtn = ({ setIsAddBtnActive, setIsAddInputActive, isAddBtnActive }) => {
  return (
    <div className="add-btn_list">
      <div
        onClick={() => {
          setIsAddBtnActive(false);
          setIsAddInputActive(true);
        }}
      >
        직접 추가
      </div>
    </div>
  );
};

export default AddBtn;
