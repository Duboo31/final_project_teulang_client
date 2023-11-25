import { useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";
import React, { createElement, useRef, useState } from "react";
import urls from "../shared/url";

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
  const delete_image = [];

  const [inputs, setInputs] = useState({
    title: title,
    content: content,
    category: category,
    article_imgs: article_imgs,
  });

  const onChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "article_imgs") {
      console.log(files);
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
        console.log("a", value);
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
      if (delete_image.length > 0) {
        formData.append("delete_image", JSON.stringify(delete_image));
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
        console.log(error.response.status);
        // if (error.response.status === 401 || error.response.status === 403) {
        //   renderErrorMsg("Unauthorized");
        // }
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
        console.log("serializer_data: ", response.data.serializer_data);
        console.log("error_list: ", response.data.error_list);
        navigate(`/article/${response.data.serializer_data.id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const renderImagePreview = (e) => {
    const { files } = e.target;
    console.log(files);
    const prevNewImages = document.getElementsByName("new_image");
    console.log("gEbN", prevNewImages.length);
    const prevNewImagesDiv = document.createElement("div");
    for (let i = 0; i < prevNewImages.length; i++) {
      console.log("prevNewImages", prevNewImages[i]);
      prevNewImages[i].style.display = "none";
    }
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const imagePreview = document.createElement("img");
          imagePreview.src = event.target.result;
          imagePreview.style.width = "200px";

          // 이미지를 표시할 요소에 추가
          const newImage = document.createElement("div");
          newImage.setAttribute("name", "new_image");
          const previewContainer = document.getElementById("preview_container");

          newImage.appendChild(imagePreview);
          previewContainer.appendChild(newImage);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleDeletePrevImage = (id) => {
    delete_image.push(id);
    document.getElementById(`prev_image${id}`).style.display = "none";
    // document.getElementById(`prev_image${id}`).remove();
    console.log(delete_image);
    console.log(delete_image.length);
  };

  const showInputs = () => {
    console.log("input", inputs);
  };

  return (
    <div>
      {/* <button onClick={showInputs}>inputs</button> */}
      <p>
        title:{" "}
        <input
          name="title"
          value={inputs.title}
          onChange={onChange}
          style={{ border: "1px solid" }}
        />
      </p>
      <p>
        content:{" "}
        <input
          name="content"
          value={inputs.content}
          onChange={onChange}
          style={{ border: "1px solid" }}
        />
      </p>
      <div>
        category:
        <select name="category" onChange={onChange} value={inputs.category}>
          <option value="chat">chat</option>
          <option value="review">review</option>
        </select>
      </div>
      <p>
        imgs:{" "}
        <input
          multiple
          type="file"
          name="article_imgs"
          files={inputs.article_imgs}
          onChange={(e) => {
            onChange(e);
            renderImagePreview(e);
          }}
        />
      </p>
      <div id="preview_container">
        {/* 기존에 있던 이미지들 띄워주기 */}
        {cur_article_imgs.length > 0 &&
          cur_article_imgs.map((img) => {
            console.log("img: ", img);
            return (
              <div key={img.id}>
                <img
                  style={{ width: "200px" }}
                  src={`${urls.baseURL}${img.free_image}`}
                />
                <button onClick={() => handleDeletePrevImage(img.id)}>x</button>
              </div>
            );
          })}
      </div>

      <button onClick={handleCreateFreeArticle}>submit</button>
    </div>
  );
}
