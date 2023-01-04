import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './components/Feed';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/sign-up' element={<SignUpPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
