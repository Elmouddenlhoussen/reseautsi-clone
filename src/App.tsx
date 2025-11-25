import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ChoiceRegisterPage from './pages/ChoiceRegisterPage'
import RegisterCompanyPage from './pages/RegisterCompanyPage'
import RegisterContributorPage from './pages/RegisterContributorPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/choice-register" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/choice-register" element={<ChoiceRegisterPage />} />
      <Route path="/register-company" element={<RegisterCompanyPage />} />
      <Route path="/register-contributor" element={<RegisterContributorPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
