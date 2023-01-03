import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './components/Feed';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
