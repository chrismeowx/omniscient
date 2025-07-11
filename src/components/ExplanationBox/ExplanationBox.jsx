import React, { useState } from 'react'
import './ExplanationBox.scss'
import arrowPrev from '../../assets/images/arrowPrevious.png'
import arrowNext from '../../assets/images/arrowNext.png'

export default function ExplanationBox({ explanation, renderUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("Render URL:", renderUrl);


  if (!explanation || explanation.length === 0) {
    return (
      <div className="explanation">
        <div className="header">
          <h1>Visualization</h1>
        </div>
        <p>No explanation yet.</p>
      </div>
    );
  }

  const currentSection = explanation[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < explanation.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="explanation">
      <div className="header">
        <h1>Visualization</h1>
      </div>

      {renderUrl && (
        <div className="render-section">
          <img src={renderUrl} alt="Generated 3D" style={{ maxWidth: "400px" }} />
        </div>
      )}

      <p>{currentSection.body}</p>
      <div className="np-buttons">
        <button className="arrow-button" onClick={handlePrev} disabled={currentIndex === 0}>
          <img className="imgg" src={arrowPrev} alt="Previous" />
        </button>
        <p>{currentIndex + 1} of {explanation.length}</p>
        <button className="arrow-button" onClick={handleNext} disabled={currentIndex === explanation.length - 1}>
          <img className="imgg" src={arrowNext} alt="Next" />
        </button>
      </div>
    </div>
  );
}

