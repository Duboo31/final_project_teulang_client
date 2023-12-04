import React from 'react'
import loadingGif from "../images/loading-gif.gif"

export default function Loading() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "500px"}}>
      <img src={loadingGif} style={{width: "150px"}}></img>
    </div>
  )
}
