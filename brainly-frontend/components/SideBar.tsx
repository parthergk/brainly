import React from "react"
import SideBarItem from "./SideBarItem"


const SideBar = () => {
  return (
    <div className=" border-r border-neutral-600 w-full max-w-16 lg:max-w-40 h-full p-2 overflow-hidden">
      <SideBarItem name="YouTube" imgUrl="./youtube.svg"/>
      <SideBarItem name="Twitter" imgUrl="./twitter.svg"/>
    </div>
  )
}

export default SideBar