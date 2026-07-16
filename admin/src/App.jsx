import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import FaqPage from './pages/FaqPage';
import HistoryPage from './pages/HistoryPage';
import { AdminContext } from './context/AdminContext';
import { useContext } from 'react';
import Login from './pages/Login';
import Sidebar from './components/SideBar';


function App() {
  const {token} = useContext(AdminContext);

  return token ? (
    <div>
      <ToastContainer/>

      <div className="flex min-h-screen">
  <Sidebar />

  <div className="flex-1 ml-64">
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  </div>
</div>
    </div>
  ) : (
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App
