import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import UserLogin from './pages/UserLogin'
import { Button } from './components/ui/button'
import Navbar from './components/Navbar'
import UserRegister from './pages/UserRegister'

const App = () => {
  // Track mouse position for CSS custom properties
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth) * 100;
      const yPercent = (clientY / innerHeight) * 100;
      
      document.documentElement.style.setProperty('--mouse-x', `${xPercent}%`);
      document.documentElement.style.setProperty('--mouse-y', `${yPercent}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  return (
    <>
      <BrowserRouter>
        <div className="dot-pattern-container bg-background">
          {/* Dot Pattern Background */}
          <div className="dot-pattern-background"></div>
          
          {/* Content */}
          <div className="dot-pattern-content">
            <Navbar/>
            <Routes>
              <Route path="/" element={<UserLogin />} />
              <Route path='/user/register' element={<UserRegister/>} />
              <Route path='/user/dashboard' element={<></>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
