import React, { useState } from "react";
import "../styles/BookmarksModal.css";
import axios from "../api/recipes/axios";
import { useNavigate } from "react-router-dom";

export default function SearchImageModal({ setModalOpen, searchValue, setIsNaviActive }) {
  const [searchImage, setSearchImage] = useState(null);
  const [detectedIngresStr, setDetectedIngresStr] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { files } = e.target;
    console.log("files", files[0]);
    setSearchImage(files[0]);

    // render image
    if (files && files.length > 0) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("search_img_preview").src = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleDetectIngredients = async () => {
    if (searchImage) {
      var formData = new FormData();
      formData.append("image", searchImage);

      await axios
        .post(
          "articles/detect_objects/",
          formData
        )
        .then(function (response) {
          console.log("reponse.data ", response.data);
          const detected_classes = response.data.detected_classes;
          let detected_classes_str = "";
          for (let i=0; i<detected_classes.length; i++) {
            if (i === detected_classes.length-1) {
                detected_classes_str += detected_classes[i]
            } else {
                detected_classes_str += detected_classes[i] + ","
            }
          }
          console.log(detected_classes_str);
          document.getElementById("detected_ingredients").innerText = (detected_classes_str === "" ? "감지된 식재료가 없습니다." : detected_classes_str);
          setDetectedIngresStr(detected_classes_str);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
        alert("감지할 이미지를 넣어주세요.")
    }
  };

  const handleSearchIngredients = () => {
    console.log("detectedIngres", detectedIngresStr);
    if (detectedIngresStr !== null) { // null은 아니고, 제출하긴 한 상태.
        if (detectedIngresStr === "") {
            if (window.confirm("감지된 식재료가 없습니다. 그래도 검색하시겠습니까?")) {
                searchValue = detectedIngresStr;
                navigate(`/search?q=${searchValue}&page=1`);
                setIsNaviActive((cur) => !cur);
                setModalOpen(false);
            }
        } 
        else {
            searchValue = detectedIngresStr;
            navigate(`/search?q=${searchValue}&page=1`);
            setIsNaviActive((cur) => !cur);
            setModalOpen(false);
        }
    }
    else { // null. 감지할 식재료 이미지를 제출하지 않은 상태.
        alert("식재료 이미지를 먼저 감지해주세요.");
    }
  };

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>

          <div className="modal__content">
            <input type="file" onChange={onChange} />
            <img id="search_img_preview" />
            감지된 식재료: <span id="detected_ingredients"></span>
            <button onClick={handleDetectIngredients}>감지</button>
            <button onClick={handleSearchIngredients}>검색</button>
          </div>
        </div>
      </div>
    </div>
  );
}
