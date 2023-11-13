import axios from "../api/recipes/axios";
import React, { useState } from "react";
import tokens from "../api/recipes/token";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
  const navigate = useNavigate();
  const array = [{ order: 1, content: "" }];
  const [recipeOrders, setRecipeOrders] = useState(array);

  const [inputs, setInputs] = useState({
    recipe_thumbnail: "",
    title: "",
    description: "",
    recipe_ingredients: "",
    recipe_order_content: {1:""}, // recipe_order를 아예 추가하지 않는 경우를 위해, 뭐 recipe_order_content가 {1:""}와 동일하면 form data에 append를 안하거나 해야할듯
    recipe_order_img: "",
  });

  const onChange = (e) => {
    const { name, value, files, id } = e.target;

    if (name === "recipe_order_img") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: {
          ...prevInputs[name],
          [id]: files[0],
        },
      }));
    } else if (name === "recipe_order_content") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: {
          ...prevInputs[name],
          [id]: value,
        },
      }));
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
      },
    ]);
  };

  const handleSubmit = async () => {
    console.log("inputs", inputs);
    var formData = new FormData();

    for (const [key, value] of Object.entries(inputs)) {
      if (key === "recipe_order_img") {
        for (const [order, img] of Object.entries(inputs.recipe_order_img)) {
          formData.append(order, img);
        }
      } else if (key === "recipe_order_content") {
        let array_form = [];
        for (const [order, content] of Object.entries( // key = order , value = content
          inputs.recipe_order_content
        )) {
          const recipe_order = { content: content, order: order };
          array_form.push(recipe_order);
        }
        formData.append("recipe_order", JSON.stringify(array_form)); // stringify 안 하면 에러남. 서버에서 못 읽어들임. 근데 또 생기긴 생기는 듯..흠
      } else if (key === "recipe_thumbnail") {
        formData.append(key, inputs.recipe_thumbnail);
      } else {
        formData.append(key, value);
      }
    }

    await axios
      .post(`/articles/recipe/`, formData, {
        headers: {
          Authorization: `Bearer ${tokens.accesstoken}`,
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

  const showInputs = () => {
    console.log("input", inputs)
  }

  return (
    <div>
        <button onClick={showInputs}>input보기</button>
      recipe_thumbnail:
      <input
        type="file"
        id="recipe_thumbnail_input"
        onChange={onChange}
        name="recipe_thumbnail"
      />
      <br />
      *title: <input id="title_input" onChange={onChange} name="title" /> <br />
      description:
      <input id="desc_input" onChange={onChange} name="description" /> <br />
      recipe_ingredients:
      <input
        id="ingredients_input"
        placeholder="각 재료는 쉼표만을 이용해 구분해주세요. (띄어쓰기 금지)"
        onChange={onChange}
        name="recipe_ingredients"
      />
      <br />
      recipe_order: <br /> <button onClick={addRecipeOrder}>+</button>
      {recipeOrders.map((recipeorder) => {
        return (
          <div key={recipeorder.order}>
            order: {recipeorder.order}
            *content:
            <input
              //   value={recipeorder.content}
              id={recipeorder.order}
              onChange={onChange}
              name="recipe_order_content"
            />
            <input
              type="file"
              onChange={onChange}
              name="recipe_order_img"
              id={recipeorder.order}
            />
          </div>
        );
      })}
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}
