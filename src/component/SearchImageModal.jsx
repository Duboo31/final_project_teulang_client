import React, { useState } from "react";
import axios from "../api/recipes/axios";
import { useNavigate } from "react-router-dom";
import "../styles/SearchImageModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import urls from "../shared/url";

export default function SearchImageModal({
  setModalOpen,
  searchValue,
  setIsNaviActive,
}) {
  const [searchImage, setSearchImage] = useState(null);
  const [detectedIngresStr, setDetectedIngresStr] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { files } = e.target;
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
        .post("articles/detect_objects/", formData)
        .then(function (response) {
          // console.log("reponse.data ", response.data);
          const detected_classes = response.data.detected_classes;
          let detected_classes_str = "";
          for (let i = 0; i < detected_classes.length; i++) {
            if (i === detected_classes.length - 1) {
              detected_classes_str += detected_classes[i];
            } else {
              detected_classes_str += detected_classes[i] + ",";
            }
          }
          // 감지된 식재료 화면에 띄우기
          document.getElementById("detected_ingredients").innerText =
            detected_classes_str === ""
              ? "감지된 식재료가 없습니다."
              : detected_classes_str;
          setDetectedIngresStr(detected_classes_str);

          // 감지된 output 이미지 화면에 띄우기
          let index = response.data.output_image_path.indexOf("/media");
          document.getElementById("search_img_preview").src = urls.baseURL+response.data.output_image_path.substr(index);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("감지할 이미지를 넣어주세요.");
    }
  };

  const handleSearchIngredients = () => {
    // console.log("detectedIngres", detectedIngresStr);
    if (detectedIngresStr !== null) {
      // null은 아니고, 제출하긴 한 상태.
      if (detectedIngresStr === "") {
        if (
          window.confirm("감지된 식재료가 없습니다. 그래도 검색하시겠습니까?")
        ) {
          searchValue = detectedIngresStr;
          navigate(`/search?q=${searchValue}&page=1`);
          setIsNaviActive((cur) => !cur);
          setModalOpen(false);
        }
      } else {
        searchValue = detectedIngresStr;
        navigate(`/search?q=${searchValue}&page=1`);
        setIsNaviActive((cur) => !cur);
        setModalOpen(false);
      }
    } else {
      // null. 감지할 식재료 이미지를 제출하지 않은 상태.
      alert("식재료 이미지를 먼저 감지해주세요.");
    }
  };

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span onClick={() => setModalOpen(false)} className="modal-close">
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>

          <div className="modal__content">
            <div className="search_modal_content">
              <div className="search_modal_left">
                <input
                  type="file"
                  onChange={onChange}
                  id="image_input_for_detection"
                  style={{ display: "none" }}
                  accept="image/png, image/jpg"
                />
                <img id="search_img_preview" className="search_img_preview" />
                <label
                  htmlFor="image_input_for_detection"
                  className="search_modal_btn"
                >
                  사진 등록
                </label>
              </div>
              <div className="search_modal_right">
                <div>
                  분석된 식재료
                  <span
                    id="detected_ingredients"
                    className="search_modal_detected_ingres"
                  ></span>
                </div>
                <button
                  onClick={handleDetectIngredients}
                  className="search_modal_btn"
                >
                  분석 하기
                </button>
              </div>
            </div>
            <div className="search_modal_footer">
              <button
                onClick={handleSearchIngredients}
                className="search_modal_btn"
              >
                레시피 찾기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
