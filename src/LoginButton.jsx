import React from 'react'
import './App.scss'
import LoginPage from './LoginPage.jsx'
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
    const navigate = useNavigate();
    const goToLoginPage = () => {
        navigate("/LoginPage");
    }
    
    return (
        <button onClick={goToLoginPage} className="loginButton">
            <p>Login</p>
        </button>
    )
}
