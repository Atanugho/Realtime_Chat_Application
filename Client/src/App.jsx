import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MessagePage from './components/MessagePage';
import HomePage from './pages/HomePage';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/User/Profile';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import EditProfile from './pages/User/EditProfile';
import ChangePassword from './pages/User/ChangePassword';

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      >
        <Route path=":userId" element={<MessagePage />} />
      </Route>

      <Route
        path="/me"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;
