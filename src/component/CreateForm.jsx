import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";

export default function CreateForm({
  article_id = "",
  show_recipe_thumbnail = "",
  recipe_thumbnail = "",
  title = "",
  description = "",
  recipe_ingredients = "",
  recipe_order_content = [{ order: 1, content: "", id: 0 , isUpdated: false}],
  recipe_order_img = "",
  show_recipe_order_img = "",
  isForUpdate = false,
}) 
{
  // 일단 재료부분 구현 전
  const recipe_ingredients_str = recipe_ingredients;
  const navigate = useNavigate();
  const [recipeOrders, setRecipeOrders] = useState(recipe_order_content);
  const [deleteOrder, setDeleteOrder] = useState([]);

  const [inputs, setInputs] = useState({
    recipe_thumbnail: recipe_thumbnail,
    title: title,
    description: description,
    recipe_ingredients: recipe_ingredients,
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
        const existingIndex = prevInputs["recipe_order_content"].findIndex((item) => item.order === Number(id));
      
        if (existingIndex !== -1) {
          // 이미 존재하는 경우 수정
          const updatedInputs = { ...prevInputs };
          console.log("ui",updatedInputs["recipe_order_content"][existingIndex])
          updatedInputs["recipe_order_content"][existingIndex] = {
            order: updatedInputs["recipe_order_content"][existingIndex].order,
            content: updatedInputs["recipe_order_content"][existingIndex].content,
            id: updatedInputs["recipe_order_content"][existingIndex].id,
            isUpdated: true
          };
          return updatedInputs;
        }});
    } else if (name === "recipe_order_content") {
      setInputs((prevInputs) => {
        const existingIndex = prevInputs[name].findIndex((item) => item.order === Number(order) && item.id === Number(id));
      
        if (existingIndex !== -1) {
          // 이미 존재하는 경우 수정
          const updatedInputs = { ...prevInputs };
          updatedInputs[name][existingIndex] = {
            order: Number(order),
            content: value,
            id: Number(id),
            isUpdated: true
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
                isUpdated: true
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

  const handleSubmit = async () => {
    var formData = new FormData();

    if (isForUpdate) { // 레시피 수정하는 경우 FormData 작성
      for (const [key, value] of Object.entries(inputs)) {
        if (deleteOrder.length > 0) {
          formData.append("delete_order", JSON.stringify(deleteOrder));
        }

        if (key === "recipe_order_img") {
          for (const [order, img] of Object.entries(inputs.recipe_order_img)) {
            formData.append(order, img);
          }
        } else if (key === "recipe_order_content") {
          let array_form = [];
          inputs.recipe_order_content.forEach(function (recipe_order) {
            if (recipe_order.isUpdated){
              console.log("recipe_order", recipe_order)
              const new_order = { id: recipe_order.id , content: recipe_order.content, order: recipe_order.order };
              array_form.push(new_order);
            }
          })

          if (array_form.length > 0) {
            formData.append("recipe_order", JSON.stringify(array_form));
          }
        } else if (key === "recipe_thumbnail") {
          if (inputs.recipe_thumbnail !== "") {
            formData.append(key, inputs.recipe_thumbnail);
          }
        } else if (key === "recipe_ingredients") {
          // formData.append(key, inputs.recipe_ingredients);
        } else {
          formData.append(key, value);
        }
      }

      updateRecipe(formData);
    }
    else { // 레시피 작성하는 경우 FormData 작성
      for (const [key, value] of Object.entries(inputs)) {
        if (key === "recipe_order_img") {
          for (const [order, img] of Object.entries(inputs.recipe_order_img)) {
            formData.append(order, img);
          }
        } else if (key === "recipe_order_content") {
          let array_form = [];
          inputs.recipe_order_content.forEach(function (recipe_order) {
            console.log("recipe_order", recipe_order)
            const new_order = { content: recipe_order.content, order: recipe_order.order };
            array_form.push(new_order);
          })

          formData.append("recipe_order", JSON.stringify(array_form)); // stringify 안 하면 에러남. 서버에서 못 읽어들임. 근데 또 생기긴 생기는 듯..흠
        } else if (key === "recipe_thumbnail") {
          formData.append(key, inputs.recipe_thumbnail);
        } else {
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

  const handleDeleteRecipeOrder = async (deleteId) => {
    setDeleteOrder((prev) => [...prev, deleteId]);
    document.getElementById(`recipe_order_input_form${deleteId}`).style.display = "none";
  }

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
      *title: <input id="title_input" onChange={onChange} name="title" value={inputs.title}/> <br />
      description:
      <input id="desc_input" onChange={onChange} name="description" value={inputs.description}/> <br />
      recipe_ingredients:
      <input
        id="ingredients_input"
        placeholder="각 재료는 쉼표만을 이용해 구분해주세요. (띄어쓰기 금지)"
        onChange={onChange}
        name="recipe_ingredients"
        value={isForUpdate ? recipe_ingredients_str : inputs.recipe_ingredients} // 재료 수정 부분 구현 미완, 수정 안 되게끔 해 둠.
      />{" "}
      <br />
      recipe_order: <br /> <button onClick={addRecipeOrder}>+</button>
      {console.log("recipeOrders",recipeOrders)}
      {console.log("inputs.recipe_order_content",inputs.recipe_order_content)}
      {console.log("delete_order",deleteOrder)}
      {recipeOrders.map((recipeorder) => {
        return (
          <div key={recipeorder.order} id={`recipe_order_input_form${recipeorder.id}`}>
            order: {recipeorder.order}
            *content: 
            <input
              value={inputs.recipe_order_content[recipeorder.order - 1] && inputs.recipe_order_content[recipeorder.order - 1].content}
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
            {isForUpdate && <button onClick={() => handleDeleteRecipeOrder(recipeorder.id)}>x{recipeorder.order}</button>}
          </div>
        );
      })}
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}
