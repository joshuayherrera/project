import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import AdminRoutes from './routes/AdminRoutes';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;