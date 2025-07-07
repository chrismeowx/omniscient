import React from 'react'
import './App.scss'
import { useNavigate, Routes, Route } from "react-router-dom";

export default function LoginButton() {
    const navigate = useNavigate();
    const goToRegisterPage = () => {
        navigate("/RegisterPage");
    }
    
    return (
        <button onClick={goToRegisterPage} className="registerButton">
            <p>Register</p>
        </button>
    )
}
