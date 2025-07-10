import React, { useState, useEffect } from "react";
import NorthWrapper from "../../components/NorthWrapper/NorthWrapper.jsx";
import "./QuizPage.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import SpecialButton from "../../components/Buttons/SpecialButton/SpecialButton.jsx";
import { useNavigate } from "react-router-dom";

export default function QuizPage() {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [selected, setSelected] = useState({
    prompts: [],
    formats: [],
  });

  const format = [
    { id: 1, qformat: "Multiple Choice", value: "Multiple" },
    { id: 2, qformat: "Essay", value: "Essay" },
  ];

  useEffect(() => {
    const fetch = async () => {
      const pastQuery = await getDocs(collection(db, "prompts"));
      const data = pastQuery.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPrompts(data);
    };

    fetch();
  }, []);

  const handlePromptClick = (promptObj) => {
    setSelected((prev) => {
      const exists = prev.prompts.find((p) => p.id === promptObj.id);
      return {
        ...prev,
        prompts: exists
          ? prev.prompts.filter((p) => p.id !== promptObj.id)
          : [...prev.prompts, promptObj],
      };
    });
  };

  const handleFormatClick = (id) => {
    setSelected((prev) => ({
      ...prev,
      formats: prev.formats.includes(id)
        ? prev.formats.filter((i) => i !== id)
        : [...prev.formats, id],
    }));
  };

  const goToGeneratedQuiz = async () => {
    if (selected.prompts.length === 0 || selected.formats.length === 0) {
      return;
    }

    const selectedFormatId = selected.formats[0];
    const selectedFormat = format.find((f) => f.id === selectedFormatId);
    const combinedPrompt = selected.prompts.map((p) => p.prompt).join("\n");

    alert("Please wait a bit.");
    console.log("SENDING PROMPT:", combinedPrompt);
    console.log("SENDING FORMAT:", selectedFormat.value);

    const response = await fetch("http://localhost:5000/generate-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: combinedPrompt,
        format: selectedFormat.value,
      }),
    });

    console.log("done fetching");

    const data = await response.json();

    navigate("/GeneratedQuiz", { state: { quiz: data.quiz } });
  };

  const handleDummyQuiz = () => {
    const dummyQuiz = [
      {
        question: "What is the capital of France?",
        options: ["A. Paris", "B. Berlin", "C. Madrid", "D. Rome"],
        answer: "A. Paris",
        explanation: "Paris is the capital and most populous city of France.",
      },
      {
        question: "Explain the significance of photosynthesis.",
        answer:
          "Photosynthesis is the process by which green plants convert sunlight into energy.",
        explanation:
          "It is essential for plant growth and produces oxygen vital for most life forms.",
      },
      {
        question: "Which number is prime?",
        options: ["A. 4", "B. 6", "C. 7", "D. 8"],
        answer: "C. 7",
        explanation:
          "7 is a prime number because it has only two divisors: 1 and itself.",
      },
    ];

    navigate("/GeneratedQuiz", { state: { quiz: dummyQuiz } });
  };

  return (
    <div>
      <div className="g1"></div>
      <div className="g2"></div>
      <NorthWrapper />

      <div className="quiz-desc">
        <h1>Quiz</h1>
        <p>Click the past prompt you want to generate into quiz</p>
      </div>

      <div className="prompt-list">
        {prompts.map((p) => (
          <button
            key={p.id}
            className={`see-past-quiz ${
              selected.prompts.some((sel) => sel.id === p.id) ? "clicked" : ""
            }`}
            onClick={() => handlePromptClick(p)}
          >
            {p.prompt}
          </button>
        ))}
      </div>

      <div className="question-format">
        <h1>Question Format</h1>
        <div className="placeholder">
          {format.map((f) => (
            <button
              key={f.id}
              className={`see-past-quiz ${
                selected.formats.includes(f.id) ? "clicked" : ""
              }`}
              onClick={() => handleFormatClick(f.id)}
            >
              {f.qformat}
            </button>
          ))}
        </div>
      </div>
      <SpecialButton onClick={handleDummyQuiz} text={"Generate"} />
    </div>
  );
}