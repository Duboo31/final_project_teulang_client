import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";

export default function CreateForm({
  article_id = "",
  show_recipe_thumbnail = "",
  recipe_thumbnail = "",
  title = "",
  description = "",
  recipe_ingredients = [], // {id, ingredients, '//article_recipe'}
  recipe_ingredients_str = "",
  recipe_order_content = [{ order: 1, content: "", id: 0, isUpdated: false }],
  recipe_order_img = "",
  show_recipe_order_img = "",
  isForUpdate = false,
}) {
  const navigate = useNavigate();
  const [recipeOrders, setRecipeOrders] = useState(recipe_order_content);
  const [deleteOrder, setDeleteOrder] = useState([]);
  const [recipeIngredients, setRecipeIngredients] =
    useState(recipe_ingredients);
  const [deleteIngredients, setDeleteIngredients] = useState([]);

  const [inputs, setInputs] = useState({
    recipe_thumbnail: recipe_thumbnail,
    title: title,
    description: description,
    recipe_ingredients_str: recipe_ingredients_str,
    recipe_order_content: recipe_order_content, // recipe_order를 아예 추가하지 않는 경우를 위해, 뭐 recipe_order_content가 {1:""}와 동일하면 form data에 append를 안하거나 해야할듯
    recipe_order_img: recipe_order_img,
  });

  const onChange = (e, order) => {
    const { name, value, files, id } = e.target;

    if (name === "recipe_order_img") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: {
          ...prevInputs[name],
          [id]: files[0],
        },
      }));
      setInputs((prevInputs) => {
        const existingIndex = prevInputs["recipe_order_content"].findIndex(
          (item) => item.order === Number(id)
        );

        if (existingIndex !== -1) {
          // 이미 존재하는 경우 수정
          const updatedInputs = { ...prevInputs };
          console.log(
            "ui",
            updatedInputs["recipe_order_content"][existingIndex]
          );
          updatedInputs["recipe_order_content"][existingIndex] = {
            order: updatedInputs["recipe_order_content"][existingIndex].order,
            content:
              updatedInputs["recipe_order_content"][existingIndex].content,
            id: updatedInputs["recipe_order_content"][existingIndex].id,
            isUpdated: true,
          };
          return updatedInputs;
        }
      });
    } else if (name === "recipe_order_content") {
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
              },
            ],
          };
        }
      });
    } else if (name === "recipe_thumbnail") {
      setInputs({
        ...inputs,
        [name]: files[0],
      });
    } else if (name === "recipe_ingredients_str") {
      // recipe_ingredients_str key의 value를 입력되는 값으로 수정.
      setInputs({
        ...inputs,
        [name]: value,
      });
    } else {
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
        id: 0,
      },
    ]);
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

  const updateRecipeIngredients = (e) => {
    const { name, value, id } = e.target;
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

    // 레시피 수정하는 경우 FormData & put 요청
    if (isForUpdate) {
      // 삭제할 레시피 순서 배열 append
      if (deleteOrder.length > 0) {
        formData.append("delete_order", JSON.stringify(deleteOrder));
      }

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
          inputs.recipe_order_content.forEach(function (recipe_order) {
            if (recipe_order.isUpdated) {
              console.log("recipe_order", recipe_order);
              const new_order = {
                id: recipe_order.id,
                content: recipe_order.content,
                order: recipe_order.order,
              };
              array_form.push(new_order);
            }
          });

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
              if (id === recipe_ingredient_tmp.id) { // 삭제할 배열에 있는 id값과 같은 id를 가진 재료의 isUpdated를 다 false로 바꿔서 최종적으로 업뎃되지 않도록 함.
                recipe_ingredient_tmp["isUpdated"] = false;
                if (!recipe_ingredient_tmp.isCreated) { // 새로 생성된 재료는 id값이 임의로 설정된 것이기에 최종적으로 append할 삭제할 배열에는 기존에 있던 재료의 id값만 넣어줌.
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
            if (recipe_ingredient.isUpdated) { // 그래서 생성된 후 삭제된것도 제외하고, 최종적으로 업데이트될 녀석들
              if (recipe_ingredient.isCreated) {
                const newObj = { // 새로 생성되는 건 id 값 0으로 설정
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
          inputs.recipe_order_content.forEach(function (recipe_order) {
            console.log("recipe_order", recipe_order);
            const new_order = {
              content: recipe_order.content,
              order: recipe_order.order,
            };
            array_form.push(new_order);
          });

          formData.append("recipe_order", JSON.stringify(array_form)); // stringify 안 하면 에러남. 서버에서 못 읽어들임. 근데 또 생기긴 생기는 듯..흠
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
        console.log(error);
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

  // 개발 단계에서 필요한, submit할 때 들어가는 input 확인용
  const showInputs = () => {
    console.log("input", inputs);
  };

  return (
    <div>
      {/** 개발 단계에서 필요한 버튼. */}
      <button onClick={showInputs}>input보기</button>
      recipe_thumbnail:
      <input
        type="file"
        id="recipe_thumbnail_input"
        onChange={onChange}
        name="recipe_thumbnail"
      />{" "}
      <br />
      *title:{" "}
      <input
        id="title_input"
        onChange={onChange}
        name="title"
        value={inputs.title}
      />{" "}
      <br />
      description:
      <input
        id="desc_input"
        onChange={onChange}
        name="description"
        value={inputs.description}
      />{" "}
      <br />
      {isForUpdate ? (
        <div>
          recipe_ingredients: <button onClick={addRecipeIngredients}>+</button>
          {console.log("recipeIngredients", recipeIngredients)}
          {console.log("deleteIngredients", deleteIngredients)}
          {recipeIngredients.map((recipeIngredient) => {
            console.log("recipeIngredient", recipeIngredient);
            return (
              <div
                key={recipeIngredient.id}
                id={`recipe_ingredient_input_form${recipeIngredient.id}`}
              >
                <input
                  value={recipeIngredient.ingredients}
                  id={recipeIngredient.id}
                  onChange={updateRecipeIngredients}
                />
                <button
                  onClick={() =>
                    handleDeleteRecipeIngredients(recipeIngredient.id)
                  }
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          recipe_ingredients:
          <input
            id="ingredients_input"
            placeholder="각 재료는 쉼표로 구분"
            onChange={onChange}
            name="recipe_ingredients_str"
            value={inputs.recipe_ingredients_str}
          />
          <br />
        </div>
      )}
      recipe_order: <button onClick={addRecipeOrder}>+</button> <br />
      {console.log("recipeOrders", recipeOrders)}
      {console.log("inputs.recipe_order_content", inputs.recipe_order_content)}
      {console.log("delete_order", deleteOrder)}
      {recipeOrders.map((recipeorder) => {
        return (
          <div
            key={recipeorder.order}
            id={`recipe_order_input_form${recipeorder.id}`}
          >
            order: {recipeorder.order}
            *content:
            <input
              value={
                inputs.recipe_order_content[recipeorder.order - 1] &&
                inputs.recipe_order_content[recipeorder.order - 1].content
              }
              id={recipeorder.id}
              onChange={(e) => onChange(e, recipeorder.order)}
              name="recipe_order_content"
            />
            <input
              type="file"
              onChange={onChange}
              name="recipe_order_img"
              id={recipeorder.order}
            />
            {isForUpdate && (
              <button onClick={() => handleDeleteRecipeOrders(recipeorder.id)}>
                x{recipeorder.order}
              </button>
            )}
          </div>
        );
      })}
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}
