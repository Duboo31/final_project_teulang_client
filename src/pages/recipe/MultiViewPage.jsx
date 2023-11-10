import React from 'react'

export default function MultiViewPage() { // 페이지는 rfc로, 컴포넌트는 rafc?로 하는 이유가?
  return (
    <div>
      <div style={{width: "50%", float: "left", border: "1px solid #000", boxSizing: "border-box", padding: "5rem", backgroundColor: "gray", backgroundClip: "content-box"}}>
        left
      </div>
      <div style={{width: "50%", float: "right", border: "1px solid #000", boxSizing: "border-box", padding: "5rem", backgroundColor: "gray", backgroundClip: "content-box"}}>
        right
      </div>
    </div>
  )
}
