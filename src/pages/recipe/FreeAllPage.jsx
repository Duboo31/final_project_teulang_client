import React from 'react'
import GetAllList from '../../component/GetAllList'
import requests from '../../api/recipes/requests'

export default function FreeAllPage() {
  return (
    <div>
      <GetAllList fetchUrl={requests.fetchFreeList} isRecipe={false}/>
    </div>
  )
}
