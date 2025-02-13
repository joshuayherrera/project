import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/Admin/AdminLayout';
import AdminDashboard from '../pages/Admin/AdminDashboard/AdminDashboard';
import UsersPage from '../pages/Admin/Users/UsersPage';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="*" element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
