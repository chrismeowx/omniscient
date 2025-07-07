import React from 'react'
import { useNavigate } from "react-router-dom";

function coolButton({ onClick }) {
    const navigate = useNavigate();
    const goToVerificationCodePage = () => {
        navigate("/VerificationCode");
    }
  return (
    <button onClick={goToVerificationCodePage} className="buttonCool">
        Register
    </button>
  )
}

export default coolButton;
