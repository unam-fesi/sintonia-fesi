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
import MyHistory  from './pages/MyHistory.jsx';
import CheckIn    from './pages/CheckIn.jsx';
import Journal    from './pages/Journal.jsx';
import Support    from './pages/Support.jsx';
import WellnessRoute from './pages/WellnessRoute.jsx';
import Companion   from './pages/Companion.jsx';
import Library     from './pages/Library.jsx';
import Emotions    from './pages/Emotions.jsx';
import CrisisFAB   from './components/CrisisFAB.jsx';

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
          <Route path="/mi-historia" element={<MyHistory />} />
          <Route path="/check-in"    element={<CheckIn />} />
          <Route path="/diario"      element={<Journal />} />
          <Route path="/apoyo"       element={<Support />} />
          <Route path="/ruta"        element={<WellnessRoute />} />
          <Route path="/companion"   element={<Companion />} />
          <Route path="/biblioteca"  element={<Library />} />
          <Route path="/emociones"   element={<Emotions />} />

          {/* Login antes de la ruta protegida; usar rutas anidadas para que Admin
              pueda definir sus subrutas (usuarios, sesiones). */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Admin />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <CrisisFAB />}
    </>
  );
}
