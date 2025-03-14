import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import RobotsList from './pages/RobotList';
import RobotDetail from './pages/RobotDetail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/robots" element={<RobotsList />} />
        <Route path="/robots/:id" element={<RobotDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

