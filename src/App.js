import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import Redirect from './pages/Redirect';
import ConfigContext from './configContext';
import { useState } from 'react';
import UserPage from './pages/UserPage';
import HashtagPage from './pages/HashtagPage';


function App() {
  const tokenLocalStorage = localStorage.getItem("session_token")
  const imageLocalStorage = localStorage.getItem("image");
  const [token, setToken] = useState(tokenLocalStorage);
  const [imageProfile, setImageProfile] = useState(imageLocalStorage);

  return (
    <ConfigContext.Provider value={{ token, setToken, imageProfile, setImageProfile }}>
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
    </ConfigContext.Provider>
  );
}

export default App;
