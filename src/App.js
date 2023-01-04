import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/timeline' element={<HomePage />} />
        <Route path='/sign-up' element={<SignUpPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
