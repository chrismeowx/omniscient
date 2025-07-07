import React from 'react'
import './SpecialButton.scss'

export default function SpecialButton({ onClick, text }) {
  return (
    <button onClick={onClick} className="button-css">{text}</button>
  )
}
