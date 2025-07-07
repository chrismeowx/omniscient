import React from 'react'
import IconProfile from "../../components/IconProfile/IconProfile.jsx"
import NavigationBar from '../../components/NavigationBar/NavigationBar.jsx'
import { useLocation } from "react-router-dom";
import PastPromptIcon from '../Buttons/PastPromptIcon/PastPromptIcon.jsx';
import PastQuiz from '../../components/Buttons/PastQuiz/PastQuiz.jsx';

function NorthWrapper({ showPastPrompt, showPastQuiz }) {
    const location = useLocation();
    const path = location.pathname;
  return (
    <div class="north-wrapper">
        <div className="left">
            {path === '/GeneratePage' && <PastPromptIcon />}
            {path === '/QuizPage' && <PastQuiz />}
        </div>        
        <div class="center">
            <NavigationBar />
        </div>
        <div class="right">
            <IconProfile />
        </div>
    </div>
  )
}

export default NorthWrapper
