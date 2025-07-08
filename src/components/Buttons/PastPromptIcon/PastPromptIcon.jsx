import React from 'react'
import folder from '../../../assets/images/folder.png'
import './PastPromptIcon.scss'
import { useNavigate } from "react-router-dom";


export default function PastPromptIcon() {
    const navigate = useNavigate();
    const goToPastPrompt = () => {
        navigate("/PromptHistory")
      }

  return (
    <button className="past-prompt" onClick={goToPastPrompt}>
        <img width="70px" height="70px" className="folder"src={folder}></img>
    </button>
  )
}
