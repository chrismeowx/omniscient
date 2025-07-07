import React, { useEffect, useState } from "react";
import NorthWrapper from '../../components/NorthWrapper/NorthWrapper.jsx'
import './PromptHistory.scss'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase'
import SpecialButton from "../../components/Buttons/SpecialButton/SpecialButton.jsx";

export default function PromptHistory() {
    const [prompt, setPrompt] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const pastQuery = await getDocs(collection(db, "prompts"));
            const data = pastQuery.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPrompt(data);
        }

        fetch();
    }, []);

  return (
    <div className="gradient-bg">
      <div className="g1"></div>
      <div className="g4"></div>
        <NorthWrapper />

        <div className="prompt-history">
            <h1>Prompt History</h1>
            {prompt.map(prompt=> (
                <button key={prompt.id} className="see-past-prompt">{prompt.prompt}</button>
            ))}
        </div>
        <SpecialButton text={"Delete"}/>
      </div>
  )
}
