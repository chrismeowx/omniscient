import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage.jsx'
import LoginPage from './LoginPage.jsx'
import RegisterPage from './RegisterPage.jsx'
import GeneratePage from './pages/GeneratePage/GeneratePage.jsx'
import VerificationCode from './VerificationCode.jsx'
import SuccessMessage from './pages/SuccessMessage/SuccessMessage.jsx'
import GoPremium from './pages/GoPremium/GoPremium.jsx'
import PromptHistory from './pages/PromptHistory/PromptHistory.jsx'
import QuizPage from './pages/QuizPage/QuizPage.jsx'
import GeneratedQuiz from "./pages/GeneratedQuiz/GeneratedQuiz.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/GeneratePage" element={<GeneratePage />} />
        <Route path="/VerificationCode" element={<VerificationCode />} />
        <Route path="/SuccessMessage" element={<SuccessMessage />} />
        <Route path="/GoPremium" element={<GoPremium />} />
        <Route path="/PromptHistory" element={<PromptHistory />} />
        <Route path="/QuizPage" element={<QuizPage />} />
        <Route path="/GeneratedQuiz" element={<GeneratedQuiz />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
