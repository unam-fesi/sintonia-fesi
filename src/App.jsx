import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home       from './pages/Home.jsx';
import Consent    from './pages/Consent.jsx';
import Assessment from './pages/Assessment.jsx';
import Results    from './pages/Results.jsx';
import Resources  from './pages/Resources.jsx';
import Privacy    from './pages/Privacy.jsx';
import Admin      from './pages/Admin.jsx';
import AdminLogin from './pages/AdminLogin.jsx';

export default function App() {
  const location = useLocation();
  // Las rutas /admin/* tienen su propio chrome (sidebar + login screen).
  // No mostramos el header/footer públicos ahí para evitar duplicar navegación.
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consentimiento" element={<Consent />} />
          <Route path="/evaluacion" element={<Assessment />} />
          <Route path="/resultado" element={<Results />} />
          <Route path="/recursos" element={<Resources />} />
          <Route path="/privacidad" element={<Privacy />} />

          {/* Login antes de la ruta protegida; usar rutas anidadas para que Admin
              pueda definir sus subrutas (usuarios, sesiones). */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Admin />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
