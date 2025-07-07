import React, { useState } from 'react'
import CoolButton2 from './CoolButton2.jsx'
import LoginButton from './LoginButton.jsx'
import { auth, db, functions } from "./firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { httpsCallable } from 'firebase/functions';

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        verified: false,
        role: "user",
        createdAt: new Date()
      });
      
      const sendOTPEmail = httpsCallable(functions, "sendOTPEmail")
      await sendOTPEmail({ email: user.email })

      alert("Your account is successfully created!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
        <div className="no-overflow">
        <div className="gradient-bg padding-in">
          <div className="g1"></div>
          <div className="g3"></div>
            <LoginButton />
            <h1>Register Account</h1>

            <div className="userData">
            <h3>Email</h3>
            <input className="input-underline" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="emailexample@gmail.com"></input>
            <h3>Password</h3>
            <input className="input-underline" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum of 8 Words with symbols"></input>
            </div>

        <CoolButton2 onClick={register}/>
        </div>
        </div>
    </div>
  )
}

export default RegisterPage;
