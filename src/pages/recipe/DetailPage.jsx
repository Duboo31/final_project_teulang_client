import React from "react";
import { useParams } from "react-router-dom";
import RecipeDetailForm from "../../component/RecipeDetailForm";

export default function DetailPage() {
  const { recipeId } = useParams();

  return (
    <div>
      <RecipeDetailForm recipeId={recipeId}/>
    </div>
  );
}
