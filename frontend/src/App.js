import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login';
import Trainee from './components/trainee';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
    <Route path="/" element={<LoginForm />} />
    <Route path="/trainee" element={<Trainee/>} />
  </Routes>
  );
}

export default App;
