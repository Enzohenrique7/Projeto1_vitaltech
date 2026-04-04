import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "../components/Layout"
import Login from "../pages/Login/Login"
import Patients from "../pages/Patients/Patients"
import PatientProfile from "../pages/Patients/PatientProfile"
import NewPatient from "../pages/Patients/NewPatient"
import Exercises from "../pages/Exercises/Exercises"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patients" element={<Layout><Patients /></Layout>} />
        <Route path="/patients/:id" element={<Layout><PatientProfile /></Layout>} />
        <Route path="/patients/new" element={<Layout><NewPatient /></Layout>} />
        <Route path="/exercicios" element={<Layout><Exercises /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes