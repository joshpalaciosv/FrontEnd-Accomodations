// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
//import Accommodations from "./components/Accommodations";
//import Reservations from "./components/Reservations";
import {
  PageNotFound,
  SignInPage,
  UsersPage,
  AccommodationsPage,
  BookingsPage,
} from "./pages";
import theme from "./theme";
import BasicCalendar from "./components/BasicCalendar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer hideProgressBar={true} />

      <CssVarsProvider defaultMode="light" theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route
              path="/dashboard/*"
              element={
                <DashboardLayout>
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route
                      path="accommodations"
                      element={<AccommodationsPage />}
                    />
                    <Route path="reservations" element={<BookingsPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="calendar" element={<BasicCalendar />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </DashboardLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </CssVarsProvider>
    </>
  );
}

export default App;
