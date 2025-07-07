import React, { useEffect} from 'react'
import './SuccessMessage.scss'
import { useNavigate } from "react-router-dom";

export default function SuccessMessage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/GeneratePage");
    }, 3000)

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="gradient-bg padding-in">
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="welcome-section">
          <h1 className="h1-special">Welcome, you are all set. Verification have done successfully, now you can enjoy Omniscient features.</h1>
        </div>
    </div>
  )
}
