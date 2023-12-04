import { useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";
import React, {
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import urls from "../shared/url";
import "../styles/CreateForm.css";
import "../styles/ArticleCreateForm.css";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ArticleCreateForm({
  article_id = "",
  title = "",
  content = "",
  category = "chat",
  article_imgs = [],
  cur_article_imgs = [],
  isForUpdate = false,
}) {
  const navigate = useNavigate();
  const delete_image = useRef([]);
  const [slidingImages, setSlidingImages] = useState([]);
  var update_cnt = useRef(0);

  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  useEffect(() => {
    const new_slidingImages = [];
    if (cur_article_imgs.length > 0) {
      cur_article_imgs.map((img) => {
        // console.log("img: ", img);
        new_slidingImages.push(
          <SwiperSlide key={img.id}>
            <div id={`cur_img_${img.id}`} className="article_create_img_div">
              <img
                style={{ width: "200px" }}
                src={`${urls.baseURL}${img.free_image}`}
              />
              <button
                onClick={() => handleDeletePrevImage(img.id)}
                className="form_ingre_update_each_del_btn"
              >
                x
              </button>
            </div>
          </SwiperSlide>
        );
      });
    }
    // console.log("new_slidingImages", new_slidingImages);
    setSlidingImages(new_slidingImages);
  }, []);

  const [inputs, setInputs] = useState({
    title: title,
    content: content,
    category: category,
    article_imgs: article_imgs,
  });

  const onChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "article_imgs") {
      // console.log(files);
      setInputs({
        ...inputs,
        [name]: files,
      });
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  const handleCreateFreeArticle = () => {
    var formData = new FormData();

    for (const [key, value] of Object.entries(inputs)) {
      if (key === "article_imgs") {
        // console.log("a", value);
        for (let i = 0; i < value.length; i++) {
          formData.append("image", value[i]);
        }
      } else {
        formData.append(key, value);
      }
    }

    if (!isForUpdate) {
      postArticle(formData);
    } else {
      // console.log("update_delete_image", delete_image.current);
      if (delete_image.current.length > 0) {
        formData.append("delete_image", JSON.stringify(delete_image.current));
      }
      updateArticle(formData);
    }
  };

  const postArticle = async (formData) => {
    const accessToken = localStorage.getItem("access");

    await axios
      .post(`/articles/free/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        console.log("reponse.data ", response.data);
        navigate(`/article/${response.data.id}`);
      })
      .catch(function (error) {
        console.log(error);
        // if (error.response.status === 401 || error.response.status === 403) {
        //   renderErrorMsg("Unauthorized");
        // }
        if (error.response.status === 401) {
          alert("인증되지 않은 사용자입니다. 로그인 해주세요.");
        }
        if (error.response.status === 403) {
          alert("인증되지 않은 사용자입니다. 이메일 인증을 진행하세요.");
        }
      });
  };

  const updateArticle = async (formData) => {
    const accessToken = localStorage.getItem("access");

    await axios
      .put(`/articles/free/${article_id}/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        // console.log("reponse.data ", response.data);
        // console.log("serializer_data: ", response.data.serializer_data);
        // console.log("error_list: ", response.data.error_list);
        navigate(`/article/${response.data.serializer_data.id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const renderImagePreview = (e) => {
    const { files } = e.target;
    const prevNewImages = document.getElementsByName("new_image");
    console.log("gEbN", prevNewImages.length);
    let prev_slidingImages = [...slidingImages]; // 배열 복제

    if (files && files.length > 0) {
      const updatedImages = []; // 업데이트된 이미지를 담을 배열

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const new_slidingImage = (
            <SwiperSlide
              name="new_image"
              key={`new_image_${update_cnt.current}`}
            >
              <div className="article_create_img_div">
                <img src={event.target.result} style={{ width: "200px" }} />
              </div>
            </SwiperSlide>
          );
          updatedImages.push(new_slidingImage);

          if (updatedImages.length === files.length) {
            // 기존의 new_image인 요소들을 제외하고 필터링
            const filteredImages = prev_slidingImages.filter(
              (image) => image.props.name !== "new_image"
            );

            const combinedImages = [...filteredImages, ...updatedImages];
            setSlidingImages(combinedImages);
          }
          update_cnt.current += 1;
        };
        reader.readAsDataURL(files[i]);
      }
    } else {
      // 파일이 없을 때 new_image 요소만 삭제한 새 배열 설정
      const filteredImages = prev_slidingImages.filter(
        (image) => image.props.name !== "new_image"
      );
      setSlidingImages(filteredImages);
    }
  };

  const handleDeletePrevImage = (id) => {
    delete_image.current.push(id);
    let selected_img = document.getElementById(`cur_img_${id}`);
    selected_img.style.display = "none";

    // console.log(delete_image.current);
    // console.log(delete_image.current.length);
  };

  const showInputs = () => {
    console.log("input", inputs);
  };

  return (
    <section className="form_section">
      <div className="whole_form">
        {/* <button onClick={showInputs}>inputs</button> */}

        <div className="form_top">
          <div className="form_top_content">
            <input
              name="title"
              value={inputs.title}
              onChange={onChange}
              placeholder="타이틀을 입력해주세요."
              className="form_title_input"
            />
            <label
              htmlFor="article_imgs_input"
              className="form_add_thumbnail_btn"
            >
              사진 등록
            </label>
            <input
              multiple
              type="file"
              name="article_imgs"
              files={inputs.article_imgs}
              id="article_imgs_input"
              onChange={(e) => {
                onChange(e);
                renderImagePreview(e);
              }}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div id="preview_container" className="form_add_thumbnail_preview">
          {/* 기존에 있던 이미지들 띄워주기 */}
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            loop={true} // loop 기능을 사용할 것인지
            breakpoints={{
              0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
            }}
            navigation // arrow 버튼 사용 유무
            pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
          >
            {/* {console.log("slidingImages", slidingImages)} */}
            {slidingImages}
          </Swiper>
        </div>
        <select
          name="category"
          onChange={onChange}
          value={inputs.category}
          className="article_select_category"
        >
          <option value="chat">자유 게시판</option>
          <option value="review">레시피 리뷰</option>
        </select>
        <div className="form_desc">
          <textarea
            ref={textRef}
            name="content"
            value={inputs.content}
            onChange={onChange}
            placeholder="내용을 입력하세요."
            className="form_desc_content"
            onInput={handleResizeHeight}
          />
        </div>

        <div className="form_submit_div">
          <button onClick={handleCreateFreeArticle} className="form_submit_btn">
            게시글 등록
          </button>
        </div>
      </div>
    </section>
  );
}
