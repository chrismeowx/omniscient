import React from 'react'
import { useNavigate } from "react-router-dom";

function coolButton({ onClick }) {
    const navigate = useNavigate();
    const goToGeneratePage = () => {
        navigate("/VerificationCode");
    }
  return (
    <button onClick={goToGeneratePage} className="buttonCool">
      Login
    </button>
  )
}

export default coolButton;
