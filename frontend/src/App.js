import logo from './logo.svg';
import './App.css';
import LoginForm from './components/admin/login';
import Trainee from './components/employeeDetails/trainee';
import { Route, Routes } from 'react-router-dom';
import TraineeNew from './components/traineeNew';
import SuccessMsg from './components/employeeDetails/successMsg';
import CheckingDetails from './components/employeeDetails/checkDetails';
import TraineeDetails from './components/TranieesDetails';
import HomePage from './components/home/homePage';

function App() {
  return (
    <Routes>
    <Route path="/" element={<LoginForm />} />
    <Route path="/trainee" element={<Trainee/>} />
    <Route path="/full-details" element={<TraineeNew/>} />
    <Route path="/checkDetails" element={<CheckingDetails/>}/>
    <Route path="/successMsg" element={<SuccessMsg/>}/>
    <Route path="/alltrainees" element={<TraineeDetails/>}/>
    <Route path="/home" element={<HomePage/>}/> 
  </Routes>
  );
}

export default App;
