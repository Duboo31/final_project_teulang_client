import React from 'react'
import GetAllList from '../../component/GetAllList'
import requests from '../../api/recipes/requests'

export default function RecipeAllPage() {
  return (
    <div>
      <GetAllList fetchUrl={requests.fetchRecipeListAll} isRecipe={true}/>
    </div>
  )
}
