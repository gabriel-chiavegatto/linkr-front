import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import ConfigContext from './configContext';
import { useState } from 'react';


function App() {
  const tokenLocalStorage = localStorage.getItem("token");
  const imageLocalStorage = localStorage.getItem("image");
  const [token, setToken] = useState(tokenLocalStorage);
  const [imageProfile, setImageProfile] = useState(imageLocalStorage);

  return (
    <ConfigContext.Provider value={{ token, setToken, imageProfile, setImageProfile }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/timeline' element={<HomePage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigContext.Provider>
  );
}

export default App;
