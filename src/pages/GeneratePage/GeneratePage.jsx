import React, { useState } from 'react'
import NavigationBar from '../../components/NavigationBar/NavigationBar.jsx'
import PromptInput from '../../components/PromptInput/PromptInput.jsx'
import './GeneratePage.scss'
import NorthWrapper from '../../components/NorthWrapper/NorthWrapper.jsx'
import ExplanationBox from '../../components/ExplanationBox/ExplanationBox.jsx'

export default function GeneratePage() {
  const [explanation, setExplanation] = useState([])
  const [renderUrl, setRenderUrl] = useState("");

  return (
    <div className="gradient-container">
      <div className="g1"></div>
      <div className="g2"></div>
      <NorthWrapper />
      <PromptInput setExplanation={setExplanation} setRenderUrl={setRenderUrl}/>
      {explanation.length > 0 && (
        <ExplanationBox explanation={explanation} renderUrl={renderUrl} />
      )} 
    </div>
  )
}
