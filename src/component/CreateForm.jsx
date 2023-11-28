import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";
import "../styles/CreateForm.css";
import urls from "../shared/url";
import default_thumbnail_img from "../images/default_thumbnail.jpg";

export default function CreateForm({
  article_id = "",
  show_recipe_thumbnail = "",
  recipe_thumbnail = "",
  title = "",
  description = "",
  recipe_ingredients = [], // {id, ingredients, '//article_recipe'}
  recipe_ingredients_str = "",
  recipe_order_content = [{ order: 1, content: "", id: 1, isUpdated: false }],
  recipe_order_img = "",
  show_recipe_order_img = [],
  isForUpdate = false,
}) {
  const navigate = useNavigate();
  const [recipeOrders, setRecipeOrders] = useState(recipe_order_content);
  const [deleteOrder, setDeleteOrder] = useState([]);
  const [recipeIngredients, setRecipeIngredients] =
    useState(recipe_ingredients);
  const [deleteIngredients, setDeleteIngredients] = useState([]);

  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  const [inputs, setInputs] = useState({
    recipe_thumbnail: recipe_thumbnail,
    title: title,
    description: description,
    recipe_ingredients_str: recipe_ingredients_str,
    recipe_order_content: recipe_order_content,
    recipe_order_img: recipe_order_img,
  });

  const onChange = (e, order, id) => {
    const { name, value, files } = e.target;

    // 조리 순서 이미지
    if (name === "recipe_order_img") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: {
          ...prevInputs[name],
          [order]: files[0],
        },
      }));
      setInputs((prevInputs) => {
        const existingIndex = prevInputs["recipe_order_content"].findIndex(
          (item) => item.order === Number(order)
        );

        if (existingIndex !== -1) {
          // 이미 존재하는 경우 수정
          const updatedInputs = { ...prevInputs };
          updatedInputs["recipe_order_content"][existingIndex] = {
            order: updatedInputs["recipe_order_content"][existingIndex].order,
            content:
              updatedInputs["recipe_order_content"][existingIndex].content,
            id: updatedInputs["recipe_order_content"][existingIndex].id,
            isUpdated: true,
            isCreated:
              updatedInputs["recipe_order_content"][existingIndex].isCreated,
          };
          return updatedInputs;
        }
      });
    }
    // 조리 순서 컨텐츠
    else if (name === "recipe_order_content") {
      setInputs((prevInputs) => {
        const existingIndex = prevInputs[name].findIndex(
          (item) => item.order === Number(order) && item.id === Number(id)
        );

        if (existingIndex !== -1) {
          // 이미 존재하는 경우 수정
          const updatedInputs = { ...prevInputs };
          updatedInputs[name][existingIndex] = {
            order: Number(order),
            content: value,
            id: Number(id),
            isUpdated: true,
            isCreated: updatedInputs[name][existingIndex].isCreated,
          };
          return updatedInputs;
        } else {
          // 존재하지 않는 경우 추가
          return {
            ...prevInputs,
            [name]: [
              ...prevInputs[name],
              {
                order: Number(order),
                content: value,
                id: 0,
                isUpdated: true,
                isCreated: true,
              },
            ],
          };
        }
      });
    }
    // 레시피 썸네일
    else if (name === "recipe_thumbnail") {
      setInputs({
        ...inputs,
        [name]: files[0],
      });
    }
    // 레시피 재료
    else if (name === "recipe_ingredients_str") {
      // recipe_ingredients_str key의 value를 입력되는 값으로 수정.
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
    // 레시피 타이틀, 레시피 설명
    else {
      if (value === "" && name === "title") {
        document.getElementById("recipe_title_error").style.display = "block";
      } else {
        document.getElementById("recipe_title_error").style.display = "none";
      }
      setInputs({
        ...inputs,
        [name]: value, // name 옆에 대괄호 안 해주면, 그냥 name이라는 key가 새로 생기고 거기에 이 value 값이 들어감.
      });
    }
  };

  // 레시피 순서 추가 시, 직전 순서의 다음 순서로 레시피 순서 input 박스 추가.
  const addRecipeOrder = () => {
    // order 설정 바로 직전 값 컴포넌트의 order + 1
    setRecipeOrders((prevRecipeOrders) => [
      ...prevRecipeOrders,
      {
        order:
          prevRecipeOrders.length > 0
            ? prevRecipeOrders[prevRecipeOrders.length - 1].order + 1
            : 1,
        content: "",
        id:
          prevRecipeOrders.length > 0
            ? prevRecipeOrders[prevRecipeOrders.length - 1].id + 1
            : 1,
        isCreated: true,
      },
    ]);
    setInputs((prevInputs) => ({
      ...prevInputs,
      recipe_order_content: [
        ...prevInputs["recipe_order_content"],
        {
          order:
            prevInputs["recipe_order_content"][
              prevInputs["recipe_order_content"].length - 1
            ].order + 1,
          content: "",
          id:
            prevInputs["recipe_order_content"][
              prevInputs["recipe_order_content"].length - 1
            ].id + 1,
          isCreated: true,
        },
      ],
    }));
  };

  const addRecipeIngredients = () => {
    // setRecipeIngredients((prevRecipeIngredients) => [...prevRecipeIngredients,{ id: 0 , ingredients: "", isUpdated: true},]);
    setRecipeIngredients((prevRecipeIngredients) => [
      ...prevRecipeIngredients,
      {
        id:
          prevRecipeIngredients.length > 0
            ? prevRecipeIngredients[prevRecipeIngredients.length - 1].id + 1
            : 1,
        ingredients: "",
        isCreated: true,
      },
    ]);
  };

  const updateRecipeIngredients = (e, ingreId) => {
    const { name, value } = e.target;
    const id = ingreId;
    console.log(e.target.value);
    setRecipeIngredients((prevRecipeIngredients) => {
      const existingIndex = prevRecipeIngredients.findIndex(
        (item) => item.id === Number(id)
      );

      if (existingIndex !== -1) {
        // 이미 존재하는 경우 수정
        const updatedRecipeIngredients = [...prevRecipeIngredients];
        updatedRecipeIngredients[existingIndex] = {
          id: Number(id),
          ingredients: value,
          isUpdated: true,
          isCreated: updatedRecipeIngredients[existingIndex].isCreated, // 없으면 undefined
        };
        return updatedRecipeIngredients;
      } else {
        // 존재하지 않는 경우 추가
        return [
          ...prevRecipeIngredients,
          {
            id: Number(id),
            ingredients: value,
            isUpdated: true,
          },
        ];
      }
    });
  };

  const handleSubmit = async () => {
    var formData = new FormData();
    let isAllContentEmpty = true;
    let error = false;

    if (inputs.recipe_order_content) {
      inputs.recipe_order_content.forEach((item) => {
        if (item.content !== "") {
          isAllContentEmpty = false;
        }
      });
    }

    // 레시피 수정하는 경우 FormData & put 요청
    if (isForUpdate) {
      for (const [key, value] of Object.entries(inputs)) {
        // 레시피 순서 이미지
        if (key === "recipe_order_img") {
          for (const [order, img] of Object.entries(inputs.recipe_order_img)) {
            formData.append(order, img);
          }
        }
        // 레시피 순서 컨텐츠
        else if (key === "recipe_order_content") {
          let array_form = [];
          let recipe_order_content_tmp = inputs.recipe_order_content;
          let delete_order = [];

          // 현재 레시피_재료 배열 중, 최종적으로 삭제시킬 id값 배열 만들기
          recipe_order_content_tmp.forEach(function (recipe_order) {
            deleteOrder.forEach(function (id) {
              if (id === recipe_order.id) {
                // 삭제할 배열에 있는 id값과 같은 id를 가진 재료의 isUpdated를 다 false로 바꿔서 최종적으로 업뎃되지 않도록 함.
                recipe_order["isUpdated"] = false;
                if (!recipe_order.isCreated) {
                  // 새로 생성된 재료는 id값이 임의로 설정된 것이기에 최종적으로 append할 삭제할 배열에는 기존에 있던 재료의 id값만 넣어줌.
                  delete_order.push(id);
                }
              }
            });
          });

          // 삭제할 재료 id 배열 append
          if (delete_order.length > 0) {
            formData.append("delete_order", JSON.stringify(delete_order));
          }

          recipe_order_content_tmp.forEach(function (recipe_order) {
            // 새로 생성된 오더의 경우 id 값을 0으로 해 줌.
            if (recipe_order.isUpdated) {
              if (recipe_order.isCreated) {
                recipe_order.id = 0;
              }
            }

            if (recipe_order.isUpdated) {
              console.log("recipe_order", recipe_order);
              if (recipe_order.content === "") {
                error = true;
              }
              const new_order = {
                id: recipe_order.id,
                content: recipe_order.content,
                order: recipe_order.order,
              };
              array_form.push(new_order);
            }
          });

          console.log("delete_order", delete_order);
          // 삭제할 레시피 순서 배열 append
          if (delete_order.length > 0) {
            formData.append("delete_order", JSON.stringify(delete_order));
          }

          if (error) {
            renderErrorMsg("recipe_order_content");
          }

          console.log("array_form", array_form);
          if (array_form.length > 0) {
            formData.append("recipe_order", JSON.stringify(array_form));
          }
        }
        // 레시피 썸네일
        else if (key === "recipe_thumbnail") {
          if (inputs.recipe_thumbnail !== "" && inputs.recipe_thumbnail) {
            formData.append(key, inputs.recipe_thumbnail);
          }
        }
        // 레시피 재료
        else if (key === "recipe_ingredients_str") {
          let recipe_ingredients_tmp = recipeIngredients;
          let delete_ingredients = [];

          // 현재 레시피_재료 배열 중, 최종적으로 삭제시킬 id값 배열 만들기
          recipe_ingredients_tmp.forEach(function (recipe_ingredient_tmp) {
            deleteIngredients.forEach(function (id) {
              if (id === recipe_ingredient_tmp.id) {
                // 삭제할 배열에 있는 id값과 같은 id를 가진 재료의 isUpdated를 다 false로 바꿔서 최종적으로 업뎃되지 않도록 함.
                recipe_ingredient_tmp["isUpdated"] = false;
                if (!recipe_ingredient_tmp.isCreated) {
                  // 새로 생성된 재료는 id값이 임의로 설정된 것이기에 최종적으로 append할 삭제할 배열에는 기존에 있던 재료의 id값만 넣어줌.
                  delete_ingredients.push(id);
                }
              }
            });
          });

          // 삭제할 재료 id 배열 append
          if (delete_ingredients.length > 0) {
            formData.append(
              "delete_ingredients",
              JSON.stringify(delete_ingredients)
            );
          }

          // 최종적으로 append할, 수정/추가될 재료 배열 만들기
          let array_form = [];

          recipe_ingredients_tmp.forEach(function (recipe_ingredient) {
            if (recipe_ingredient.isUpdated) {
              // 그래서 생성된 후 삭제된것도 제외하고, 최종적으로 업데이트될 녀석들
              if (recipe_ingredient.isCreated) {
                const newObj = {
                  // 새로 생성되는 건 id 값 0으로 설정
                  id: 0,
                  ingredients: recipe_ingredient.ingredients,
                };
                array_form.push(newObj);
              } else {
                const newObj = {
                  id: recipe_ingredient.id,
                  ingredients: recipe_ingredient.ingredients,
                };
                array_form.push(newObj);
              }
            }
          });

          formData.append("recipe_ingredients", JSON.stringify(array_form));
        }
        // 레시피 타이틀, 설명
        else {
          formData.append(key, value);
        }
      }

      updateRecipe(formData);
    }
    // 레시피 작성하는 경우 FormData & post 요청
    else {
      for (const [key, value] of Object.entries(inputs)) {
        // 레시피 순서 이미지
        if (key === "recipe_order_img") {
          for (const [order, img] of Object.entries(inputs.recipe_order_img)) {
            formData.append(order, img);
          }
        }
        // 레시피 순서 컨텐츠
        else if (key === "recipe_order_content") {
          let array_form = [];

          // 유저가 레시피 순서 부분에 아무것도 입력하지 않은 경우는 formData에 append 자체를 안하게끔 설정.
          if (!(isAllContentEmpty && inputs.recipe_order_img === "")) {
            if (isAllContentEmpty && inputs.recipe_order_img !== "") {
              error = true;
            }

            inputs.recipe_order_content.forEach(function (recipe_order) {
              // 여기서 컨텐츠 입력하지 않은 경우 에러 처리.
              if (recipe_order.content === "") {
                error = true;
              }
              const new_order = {
                content: recipe_order.content,
                order: recipe_order.order,
              };
              array_form.push(new_order);
            });

            if (error) {
              renderErrorMsg("recipe_order_content");
            }

            formData.append("recipe_order", JSON.stringify(array_form)); // stringify 안 하면 에러남. 서버에서 못 읽어들임. 근데 또 생기긴 생기는 듯..흠
          }
        }
        // 레시피 썸네일
        else if (key === "recipe_thumbnail") {
          formData.append(key, inputs.recipe_thumbnail);
        }
        // 레시피 재료
        else if (key === "recipe_ingredients_str") {
          formData.append("recipe_ingredients", value);
        }
        // 레시피 타이틀, 설명
        else {
          // 타이틀 입력하지 않은 경우 에러메시지 띄우기
          if (key === "title" && value === "") {
            renderErrorMsg("recipe_title");
          }
          formData.append(key, value);
        }
      }

      postRecipe(formData);
    }
  };

  const postRecipe = async (formData) => {
    const accessToken = localStorage.getItem("access");

    await axios
      .post(`/articles/recipe/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        console.log("reponse.data ", response.data);
        navigate(`/recipe/${response.data.id}`);
      })
      .catch(function (error) {
        console.log(error.response.status);
        if (error.response.status === 401 || error.response.status === 403) {
          renderErrorMsg("Unauthorized");
        }
      });
  };

  const updateRecipe = async (formData) => {
    const accessToken = localStorage.getItem("access");

    await axios
      .put(`/articles/recipe/${article_id}/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        console.log("reponse.data ", response.data);
        navigate(`/recipe/${response.data.id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDeleteRecipeOrders = async (deleteId) => {
    setDeleteOrder((prev) => [...prev, deleteId]);
    document.getElementById(
      `recipe_order_input_form${deleteId}`
    ).style.display = "none";
  };

  const handleDeleteRecipeIngredients = async (deleteId) => {
    setDeleteIngredients((prev) => [...prev, deleteId]);
    document.getElementById(
      `recipe_ingredient_input_form${deleteId}`
    ).style.display = "none";
  };

  const renderErrorMsg = (type) => {
    const error_space = document.getElementById("form_error");

    if (type === "recipe_title") {
      document.getElementById("recipe_title_error").style.display = "block";
    } else if (type === "recipe_order_content") {
      document.getElementById("recipe_order_content_error").style.display =
        "block";
    } else if (type === "Unauthorized") {
      error_space.innerText =
        "인증되지 않은 사용자입니다. 로그인 혹은 이메일 인증을 진행하세요.";
      error_space.style.display = "block";
    }
  };

  const renderImagePreview = (e, order) => {
    const { name, files } = e.target;
    console.log(name, files);
    if (files && files.length > 0) {
      var reader = new FileReader();
      reader.onload = function (e) {
        if (name === "recipe_order_img") {
          document.getElementById(`recipe_order_img_preview${order}`).src =
            e.target.result;
        } else if (name === "recipe_thumbnail") {
          document.getElementById("recipe_thumbnail_preview").src =
            e.target.result;
        }
        // console.log(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // 개발 단계에서 필요한, submit할 때 들어가는 input 확인용
  const showInputs = () => {
    console.log("input", inputs);
  };

  return (
    <section className="form_section">
      <div className="whole_form">
        {/** 개발 단계에서 필요한 버튼. */}
        {/* <button onClick={showInputs}>input보기</button> */}

        <div className="form_top">
          {/* 레시피 타이틀 & 썸네일 추가 버튼 */}
          <div className="form_top_content">
            <input
              id="title_input"
              onChange={onChange}
              name="title"
              value={inputs.title}
              placeholder="타이틀을 입력해주세요."
              className="form_title_input"
            />
            <label
              htmlFor="recipe_thumbnail_input"
              className="form_add_thumbnail_btn"
            >
              대표 사진 추가
            </label>
            <input
              type="file"
              id="recipe_thumbnail_input"
              onChange={(e) => {
                onChange(e);
                renderImagePreview(e);
              }}
              name="recipe_thumbnail"
              style={{ display: "none" }}
            />
          </div>

          <span
            id="recipe_title_error"
            style={{ display: "none" }}
            className="form_title_error"
          >
            title은 필수 입력값입니다.
          </span>
        </div>

        <img
          id="recipe_thumbnail_preview"
          src={
            isForUpdate
              ? `${urls.baseURL}${show_recipe_thumbnail}`
              : default_thumbnail_img
          }
          className="form_add_thumbnail_preview"
        />

        {/* 레시피 설명 */}
        <div className="form_desc">
          <p className="form_desc_top">설명</p>
          <textarea
            ref={textRef}
            id="desc_input"
            onChange={onChange}
            name="description"
            value={inputs.description}
            placeholder="레시피를 설명해주세요."
            className="form_desc_content"
            onInput={handleResizeHeight}
          />
        </div>

        {/* 레시피 재료 */}
        {isForUpdate ? (
          <div className="form_ingre">
            <div className="form_orders_top">
              <span className="form_ingre_top_title">재료 : </span>
              <button onClick={addRecipeIngredients} className="form_add_btn">
                +
              </button>
            </div>
            <div className="form_ingre_update_body">
              {recipeIngredients.map((recipeIngredient) => {
                console.log("recipeIngredient", recipeIngredient);
                return (
                  <span
                    key={recipeIngredient.id}
                    id={`recipe_ingredient_input_form${recipeIngredient.id}`}
                    className="form_ingre_update_each"
                  >
                    <input
                      value={recipeIngredient.ingredients}
                      onChange={(e) =>
                        updateRecipeIngredients(e, recipeIngredient.id)
                      }
                      className="form_ingre_update_each_name"
                    />
                    <button
                      onClick={() =>
                        handleDeleteRecipeIngredients(recipeIngredient.id)
                      }
                      className="form_ingre_update_each_del_btn"
                    >
                      x
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="form_ingre">
            <div className="form_ingre_top">
              <span className="form_ingre_top_title">재료 </span>
              {/* <span className="form_ingre_top_notice">
                각 재료는 쉼표로 구분해서 넣어주세요.
              </span> */}
            </div>
            <textarea
              id="ingredients_create_input"
              placeholder="각 재료는 쉼표로 구분해서 넣어주세요."
              onChange={onChange}
              name="recipe_ingredients_str"
              value={inputs.recipe_ingredients_str}
              className="form_ingre_input"
              ref={textRef}
              onInput={handleResizeHeight}
            />
          </div>
        )}

        {/* 조리 순서 */}
        <div className="form_orders">
          <div className="form_orders_top">
            <div className="form_orders_top_left">
              <span className="form_orders_top_title">요리 순서</span>
              <span
                id="recipe_order_content_error"
                style={{ display: "none" }}
                className="form_orders_error"
              >
                조리 순서 내용은 필수 입력값입니다.
              </span>
            </div>
            <button
              onClick={addRecipeOrder}
              className="add-list_btn form_add_btn"
            >
              조리 방법 추가
            </button>
          </div>

          <div className="form_orders_body">
            {recipeOrders.map((recipeorder) => {
              let recipeOrderContent = "";
              let recipeOrderImgSrc = "";

              inputs.recipe_order_content.forEach((item) => {
                if (item.order === recipeorder.order) {
                  recipeOrderContent = item.content;
                }
              });

              show_recipe_order_img.map((show_src_obj) => {
                if (show_src_obj.order === recipeorder.order) {
                  recipeOrderImgSrc = show_src_obj.img_src;
                }
              });

              return (
                <div
                  key={recipeorder.order}
                  id={`recipe_order_input_form${recipeorder.id}`}
                  className="form_orders_each"
                >
                  <div className="form_orders_each_top">
                    <label
                      htmlFor={`recipe_order_img${recipeorder.order}`}
                      className="form_orders_add_each_btn"
                    >
                      {recipeorder.order}번 이미지 등록
                    </label>
                    {isForUpdate && (
                      <button
                        onClick={() => handleDeleteRecipeOrders(recipeorder.id)}
                        className="form_orders_add_each_btn"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                  <div className="form_orders_each_body">
                    <span className="form_orders_each_order">
                      {recipeorder.order}
                    </span>
                    <textarea
                      value={
                        inputs.recipe_order_content[recipeorder.order - 1] &&
                        recipeOrderContent
                      }
                      onChange={(e) =>
                        onChange(e, recipeorder.order, recipeorder.id)
                      }
                      name="recipe_order_content"
                      id={`recipe_order_content${recipeorder.id}`}
                      className="form_orders_each_content"
                      ref={textRef}
                      onInput={handleResizeHeight}
                    />
                    <img
                      id={`recipe_order_img_preview${recipeorder.order}`}
                      src={
                        recipeOrderImgSrc !== "" &&
                        `${urls.baseURL}${recipeOrderImgSrc}`
                      }
                      className="form_orders_each_img_preview"
                    />
                    <input
                      type="file"
                      id={`recipe_order_img${recipeorder.order}`}
                      onChange={(e) => {
                        onChange(e, recipeorder.order, recipeorder.id);
                        renderImagePreview(e, recipeorder.order);
                      }}
                      name="recipe_order_img"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="form_error_div">
          <p id="form_error" className="form_error"></p>
        </div>
        <div className="form_submit_div">
          <button onClick={handleSubmit} className="form_submit_btn">
            레시피 등록
          </button>
        </div>
      </div>
    </section>
  );
}
