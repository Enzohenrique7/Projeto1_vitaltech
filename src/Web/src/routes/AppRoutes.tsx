import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "../context/AuthContext"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/Layout"
import Login from "../pages/Login/Login"
import Patients from "../pages/Patients/Patients"
import PatientProfile from "../pages/Patients/PatientProfile"
import NewPatient from "../pages/Patients/NewPatient"
import Exercises from "../pages/Exercises/Exercises"
import NewExercise from "../pages/Exercises/NewExercise"
import ExerciseImages from "../pages/Exercises/ExerciseImages"

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patients" element={<PrivateRoute><Layout><Patients /></Layout></PrivateRoute>} />
          <Route path="/patients/:id" element={<PrivateRoute><Layout><PatientProfile /></Layout></PrivateRoute>} />
          <Route path="/patients/new" element={<PrivateRoute><Layout><NewPatient /></Layout></PrivateRoute>} />
          <Route path="/exercicios" element={<PrivateRoute><Layout><Exercises /></Layout></PrivateRoute>} />
          <Route path="/exercicios/new" element={<PrivateRoute><Layout><NewExercise /></Layout></PrivateRoute>} />
          <Route path="/exercicios/:id/imagens" element={<PrivateRoute><Layout><ExerciseImages /></Layout></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRoutes
