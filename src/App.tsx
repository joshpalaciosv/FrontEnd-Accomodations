// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import LoginPage from './components/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import Accommodations from './components/Accommodations';
import Reservations from './components/Reservations';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <CssVarsProvider defaultMode="light">
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<DashboardLayout>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="accommodations" element={<Accommodations />} />
              <Route path="reservations" element={<Reservations />} />
            </Routes>
          </DashboardLayout>} />
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
    </>
  )
}

export default App
