
import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Formulario = lazy(() => import('./paginas/Formulario'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/formulario" replace />} />
      <Route path="/formulario" element={<Formulario />} />
    </Routes>
  );
};

export default AppRoutes;
