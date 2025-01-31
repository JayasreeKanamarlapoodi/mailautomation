import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login';
import Trainee from './components/trainee';
import { Route, Routes } from 'react-router-dom';
import TraineeNew from './components/traineeNew';
import SuccessMsg from './components/successMsg';
import CheckingDetails from './components/checkDetails';

function App() {
  return (
    <Routes>
    <Route path="/" element={<LoginForm />} />
    <Route path="/trainee" element={<Trainee/>} />
    <Route path="/full-details" element={<TraineeNew/>} />
    <Route path="/checkDetails" element={<CheckingDetails/>}/>
    <Route path="/successMsg" element={<SuccessMsg/>}/>
  </Routes>
  );
}

export default App;
