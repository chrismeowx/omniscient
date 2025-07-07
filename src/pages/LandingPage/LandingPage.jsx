import '../../App.scss'
import LoginButton from '../../LoginButton.jsx'
import { ArrowUp } from 'lucide-react'
import PromptInput from '../../components/PromptInput/PromptInput.jsx'

function LandingPage() {
  return (
    <div className="gradient-bg">
      <div className="g1"></div>
      <div className="g2"></div>
      <LoginButton />
      <PromptInput />
    </div>
  );
}

export default LandingPage;
