import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import NorthWrapper from "../../components/NorthWrapper/NorthWrapper";
import './GeneratedQuiz.scss';
import arrowPrev from '../../assets/images/arrowPrevious.png';
import arrowNext from '../../assets/images/arrowNext.png';
import arrowUp from '../../assets/images/arrowUp.png';
import ExplanationBox from "../../components/ExplanationBox/ExplanationBox";

export default function GeneratedQuiz() {
  const location = useLocation();
  const { quiz } = location.state;

  const [idx, setIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [essayAnswer, setEssayAnswer] = useState("");
  const [explanations, setExplanations] = useState([]);

  if (!quiz || quiz.length === 0) {
    return <div>No quiz generated.</div>;
  }

  const current = quiz[idx];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const isRight = option.trim().charAt(0).toUpperCase() === current.answer.trim().charAt(0).toUpperCase();
    setIsCorrect(isRight);

    const explain = isRight
      ? `Benar! ${option} adalah jawaban yang tepat.`
      : `Salah. Jawaban benar adalah ${current.answer}.`;

    setExplanations([
        { body: explain },
        { body: current.explanation } 
    ]);
  };

  const handlePrev = () => {
    if (idx > 0) {
      setIdx(idx - 1);
      resetStates();
    }
  };

  const handleNext = () => {
    if (idx < quiz.length - 1) {
      setIdx(idx + 1);
      resetStates();
    }
  };

  const resetStates = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setEssayAnswer("");
    setExplanations([]);
  };

  const handleEssayChange = (e) => {
    setEssayAnswer(e.target.value);
  };

  const handleEssaySubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/check-essay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: current.question,
          user_answer: essayAnswer,
          correct_answer: current.answer
        }),
      });

      if (!response.ok) throw new Error("Failed to check essay.");

      const data = await response.json();
      setExplanations([{ body: data.feedback }]);
    } catch (err) {
      console.error(err);
      setExplanations([{ body: "Error checking essay answer." }]);
    }
  };

  return (
    <div>
      <NorthWrapper />
      <div className="g1"></div>
      <div className="g2"></div>

      <div className="quiz-desc">
        <h1>Quiz</h1>
      </div>

      <div className="quiz-question">
        <h2>{current.question}</h2>

        {current.options?.length > 0 ? (
          <div className="place-holder">
            <div className="options-container">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  className={`option-btn ${selectedOption === opt ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleOptionClick(opt)}
                  disabled={selectedOption !== null}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="prompt-wrapper">
            <textarea
              value={essayAnswer}
              onChange={handleEssayChange}
              placeholder="Type your answer here..."
              className="essayInput"
            />
            <button
              className="enter-button"
              onClick={handleEssaySubmit}
              disabled={!essayAnswer.trim()}
            >
              <img src={arrowUp} className="arrow" alt="Submit" />
            </button>
          </div>
        )}


        <br />
        <div className="np-buttons">
          <button className="arrow-button" onClick={handlePrev} disabled={idx === 0}>
            <img className="imgg" src={arrowPrev} alt="Previous" />
          </button>
          <p>{idx + 1} of {quiz.length}</p>
          <button className="arrow-button" onClick={handleNext} disabled={idx === quiz.length - 1}>
            <img className="imgg" src={arrowNext} alt="Next" />
          </button>
        </div>
      </div>
        {explanations.length > 0 && (
          <ExplanationBox explanation={explanations} />
        )}
    </div>
  );
}
