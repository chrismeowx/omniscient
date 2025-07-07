import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerificationCode() {
    const [OTP, setOTP] = useState(new Array(5).fill(""));
    const navigate = useNavigate();

    const handleInput = (e, index) => {
        const value = e.target.value;

        const newOTP = [...OTP];
        newOTP[index] = value[0];
        setOTP(newOTP)

        if (index < OTP.length - 1) {
            const next = document.querySelectorAll('.verif-code-input')[index + 1];
            if(next) {
                next.focus();
            }
        }

        if(newOTP.every((digit) => digit !== "")) {
            navigate("/SuccessMessage")
        }
    };

  return (
    <div className="gradient-bg">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="verifMessage">
            <h1 className="h1-special">Verification Code</h1>
            <p>A unique verification code has been sent to your registered email address. Please check your inbox and enter the code below to complete your account verification process. If you haven’t received the code within a few minutes, you may request to resend it.</p>
            <div className="code-input">
                <input className="verif-code-input" type="text" maxLength="1" onChange={(e) => handleInput(e, 0)}></input>
                <input className="verif-code-input" type="text" maxLength="1" onChange={(e) => handleInput(e, 1)}></input>
                <input className="verif-code-input" type="text" maxLength="1" onChange={(e) => handleInput(e, 2)}></input>
                <input className="verif-code-input" type="text" maxLength="1" onChange={(e) => handleInput(e, 3)}></input>
                <input className="verif-code-input" type="text" maxLength="1" onChange={(e) => handleInput(e, 4)}></input>
            </div>
            <div className="resend-section">
                <h2>Haven't got your code of verification yet?</h2>
                <button className="buttonCool">Resend</button>
            </div>
        </div>
    </div>
  )
}
