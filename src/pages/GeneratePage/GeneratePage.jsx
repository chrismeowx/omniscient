import React, { useState } from 'react'
import NavigationBar from '../../components/NavigationBar/NavigationBar.jsx'
import PromptInput from '../../components/PromptInput/PromptInput.jsx'
import './GeneratePage.scss'
import NorthWrapper from '../../components/NorthWrapper/NorthWrapper.jsx'
import ExplanationBox from '../../components/ExplanationBox/ExplanationBox.jsx'

export default function GeneratePage() {
  const [explanation, setExplanation] = useState([
    {
      body: "Protons, neutrons, and electrons are the three main subatomic particles that make up an atom. They determine the identity of an element and contribute to the atom’s mass."
    },
    {
      body: "Neutrons are neutral particles found in the nucleus of an atom. They have no electric charge and play a crucial role in stabilizing the nucleus by reducing repulsion between positively charged protons."
    },
    {
      body: "The number of neutrons in an atom can vary without changing the element, forming different isotopes of the same element."
    },
    {
      body: "Unlike electrons and protons, neutrons do not interact via electromagnetic force, but they contribute significantly to atomic mass and nuclear reactions."
    },
    {
      body: "Neutrons are essential in nuclear fission, where splitting atoms release energy, used in both power generation and atomic weapons."
    }
  ]);
  const [renderUrl, setRenderUrl] = useState("https://www.icegif.com/wp-content/uploads/2023/09/icegif-960.gif");

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
