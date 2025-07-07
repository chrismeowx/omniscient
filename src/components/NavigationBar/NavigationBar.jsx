import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import './NavigationBar.scss'

export default function NavigationBar() {
  const location = useLocation();
  return (
    <nav className="navigation-bar">
        <NavLink to="/GeneratePage" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>Generate</NavLink>
        <NavLink to="/QuizPage" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}> Quiz</NavLink>
    </nav>
  )
}
