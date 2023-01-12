import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import Redirect from './pages/Redirect';
import ConfigContext from './configContext';
import AuthProvider from './Auth';
import { useState } from 'react';
import UserPage from './pages/UserPage';
import HashtagPage from './pages/HashtagPage';


function App() {
  const tokenLocalStorage = localStorage.getItem("session_token")
  const [user, setUser] = useState(JSON.parse(tokenLocalStorage));

  return (
    <ConfigContext.Provider value={{  user, setUser }}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Redirect />} />
            <Route path='/timeline' element={<HomePage />} />
            <Route path='/sign-in' element={<LoginPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/user/:id' element={<UserPage />} />
            <Route path='/hashtag/:hashtag' element={<HashtagPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ConfigContext.Provider>
  );
}

export default App;
