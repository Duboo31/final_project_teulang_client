import React from "react";
import { useLocation } from "react-router-dom";
import CreateForm from "../../component/CreateForm";

export default function UpdatePage() {
  const { state } = useLocation();

  var recipe_ingredients_str = "";
  var recipe_order_content = [];
  var recipe_order_img = {};

  if (state) {
    console.log(state["recipeDetail"]);

    // 전송할 레시피 재료 가공
    for (let i = 0; i < state["recipeDetail"].recipe_ingredients.length; i++) {
      if (i === 0) {
        recipe_ingredients_str +=
          state["recipeDetail"].recipe_ingredients[i].ingredients;
      } else {
        recipe_ingredients_str +=
          "," + state["recipeDetail"].recipe_ingredients[i].ingredients;
      }
    }

    // 전송할 recipe_order_content / img 가공
    for (let i = 0; i < state["recipeDetail"].recipe_order.length; i++) {
      let order = state["recipeDetail"].recipe_order[i].order;
      let content = state["recipeDetail"].recipe_order[i].content;
      let id = state["recipeDetail"].recipe_order[i].id;
      let recipe_img = state["recipeDetail"].recipe_order[i].recipe_img;

      let newObj = { order: order, content: content, id: id, isUpdated: false };
      recipe_order_content.push(newObj);
      if (recipe_img) {
        recipe_order_img[order] = recipe_img;
      }
    }
  }

  return (
    <div>
      {state && (
        <CreateForm
          article_id={state["recipeDetail"].id}
          show_recipe_thumbnail={
            !state["recipeDetail"].api_recipe &&
            state["recipeDetail"].recipe_thumbnail
          }
          title={state["recipeDetail"].title}
          description={state["recipeDetail"].description}
          recipe_ingredients={state["recipeDetail"].recipe_ingredients} // recipe_ingredients_str
          recipe_ingredients_str={recipe_ingredients_str}
          recipe_order_content={
            recipe_order_content.length > 0 && recipe_order_content
          }
          show_recipe_order_img={recipe_order_img}
          isForUpdate={true}
        />
      )}
    </div>
  );
}
