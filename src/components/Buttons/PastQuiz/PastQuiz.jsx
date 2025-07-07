import React from 'react'
import pastQuiz from '/Users/angel/omniscient/src/assets/images/pastQuiz.png'
import './PastQuiz.scss'
import { useNavigate } from "react-router-dom";

export default function PastQuiz() {
    const navigate = useNavigate();
    const goToPastQuizHistory = () => {
        navigate("/QuizHistory")
      }

  return (
    <button className="past-quiz" onClick={goToPastQuizHistory}>
        <img width="70px" height="70px" src={pastQuiz}></img>
    </button>
  )
}
