import React from 'react'
import './IconProfile.scss'
import Profile from "../../assets/images/profile.png"

export default function IconProfile() {
  return (
   <button className="icon">
    <img className="profile" src={Profile}></img>
   </button>
  )
}
