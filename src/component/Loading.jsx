import React from 'react'
import loadingGif from "../images/loading-gif.gif"

export default function Loading({width = "100px", backHeight = "500px"}) {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: backHeight}}>
      <img src={loadingGif} style={{width: width}}></img>
    </div>
  )
}
