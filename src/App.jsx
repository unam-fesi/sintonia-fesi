import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home       from './pages/Home.jsx';
import Consent    from './pages/Consent.jsx';
import Assessment from './pages/Assessment.jsx';
import Results    from './pages/Results.jsx';
import Resources  from './pages/Resources.jsx';
import Privacy    from './pages/Privacy.jsx';
import Admin      from './pages/Admin.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consentimiento" element={<Consent />} />
          <Route path="/evaluacion" element={<Assessment />} />
          <Route path="/resultado" element={<Results />} />
          <Route path="/recursos" element={<Resources />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
