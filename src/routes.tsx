import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import EmployeeDashboard from '@/pages/EmployeeDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import UserManagement from '@/pages/UserManagement';
import UserApprovals from '@/pages/UserApprovals';
import Employees from '@/pages/Employees';
import Attendance from '@/pages/Attendance';
import Leaves from '@/pages/Leaves';
import Departments from '@/pages/Departments';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import Payroll from '@/pages/Payroll';
import PayrollHistory from '@/pages/PayrollHistory';
import Performance from '@/pages/Performance';
import Travel from '@/pages/Travel';
import Reports from '@/pages/Reports';
import Goals from '@/pages/Goals';
import Rewards from '@/pages/Rewards';
import WhatsAppGroups from '@/pages/WhatsAppGroups';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/employee-dashboard" element={
        <ProtectedRoute>
          <EmployeeDashboard />
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute>
          <UserManagement />
        </ProtectedRoute>
      } />
      <Route path="/user-approvals" element={
        <ProtectedRoute>
          <UserApprovals />
        </ProtectedRoute>
      } />
      <Route path="/employees" element={
        <ProtectedRoute>
          <Employees />
        </ProtectedRoute>
      } />
      <Route path="/attendance" element={
        <ProtectedRoute>
          <Attendance />
        </ProtectedRoute>
      } />
      <Route path="/leaves" element={
        <ProtectedRoute>
          <Leaves />
        </ProtectedRoute>
      } />
      <Route path="/departments" element={
        <ProtectedRoute>
          <Departments />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/payroll" element={
        <ProtectedRoute>
          <Payroll />
        </ProtectedRoute>
      } />
      <Route path="/payroll/history" element={
        <ProtectedRoute>
          <PayrollHistory />
        </ProtectedRoute>
      } />
      <Route path="/performance" element={
        <ProtectedRoute>
          <Performance />
        </ProtectedRoute>
      } />
      <Route path="/goals" element={
        <ProtectedRoute>
          <Goals />
        </ProtectedRoute>
      } />
      <Route path="/rewards" element={
        <ProtectedRoute>
          <Rewards />
        </ProtectedRoute>
      } />
      <Route path="/travel" element={
        <ProtectedRoute>
          <Travel />
        </ProtectedRoute>
      } />
      <Route path="/reports/*" element={
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      } />
      <Route path="/whatsapp-groups" element={
        <ProtectedRoute>
          <WhatsAppGroups />
        </ProtectedRoute>
      } />
    </Routes>
  );
}