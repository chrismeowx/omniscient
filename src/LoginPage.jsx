import React from 'react'
import CoolButton from './coolButton.jsx'
import RegisterButton from './RegisterButton.jsx'

function LoginPage() {
  return (
    <div className="no-overflow">
      <div className="gradient-bg padding-in">
        <div className="g1"></div>
        <div className="g2"></div>
        <RegisterButton />
        <h1>Login to Your Account</h1>

        <div className="userData">
          <h3>Email</h3>
          <input className="input-underline" type="text" placeholder="emailexample@gmail.com"></input>
          <h3>Password</h3>
          <input className="input-underline" type="text" placeholder="Minimum of 8 Words with symbols"></input>
        </div>

      <CoolButton />
      </div>
    </div>
  )
}

export default LoginPage;