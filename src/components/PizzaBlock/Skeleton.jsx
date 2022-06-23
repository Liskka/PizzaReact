import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = () => (
  <div className="pizza-block">
    <ContentLoader 
      speed={2}
      width={278}
      height={470}
      viewBox="0 0 278 470"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="2" y="260" rx="0" ry="0" width="272" height="27" /> 
      <rect x="1" y="306" rx="10" ry="10" width="270" height="76" /> 
      <rect x="7" y="414" rx="7" ry="7" width="115" height="23" /> 
      <circle cx="133" cy="120" r="117" /> 
      <rect x="133" y="407" rx="20" ry="20" width="136" height="40" />
    </ContentLoader>
  </div>
)

