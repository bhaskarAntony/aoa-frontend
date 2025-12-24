import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/user/DashboardPage';
import RegistrationPage from './pages/user/RegistrationPage';
import CheckoutPage from './pages/user/CheckoutPage';
import PaymentStatusPage from './pages/user/PaymentStatusPage';
import AccommodationListPage from './pages/user/AccommodationListPage';
import AccommodationDetailPage from './pages/user/AccommodationDetailPage';
import AccommodationCheckoutPage from './pages/user/AccommodationCheckoutPage';
import ConferenceDaysPage from './pages/user/ConferenceDaysPage';
import AbstractRulesPage from './pages/user/AbstractRulesPage';
import AbstractUploadPage from './pages/user/AbstractUploadPage';
import FeedbackPage from './pages/user/FeedbackPage';
import RegistrationFeesPage from './pages/user/RegistrationFeesPage';
import CommitteePage from './pages/user/CommitteePage';
import VenuePage from './pages/user/VenuePage';
import ContactPage from './pages/user/ContactPage';
import HomePage from './pages/user/HomePage';
import BrochurePage from './pages/user/BrochurePage';
import TermsPage from './pages/user/TermsPage';
import CancellationPolicyPage from './pages/user/CancellationPolicyPage';
import PrivacyPolicyPage from './pages/user/PrivacyPolicyPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import RegistrationsManagementPage from './pages/admin/RegistrationsManagementPage';
import AccommodationManagementPage from './pages/admin/AccommodationManagementPage';
import PaymentsManagementPage from './pages/admin/PaymentsManagementPage';
import AbstractReviewPage from './pages/admin/AbstractReviewPage';
import FeedbackViewerPage from './pages/admin/FeedbackViewerPage';
import { useEffect } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner';
import Footer from './components/common/Footer';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005aa9]"></div>
      </div>
    );
  }
  
  return isAuthenticated ?children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />; 
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005aa9]"></div>
      </div>
    );
  }
  
  // If authenticated user visits public page, redirect to dashboard/home
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} replace />;
  }
  
  return children;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const baseTitle = 'AOACON 2026';
    const defaultSeo = {
      title: `${baseTitle} | AOA Shivamogga`,
      description:
        'AOACON 2026 is the 19th Annual Conference of the Association of Obstetric Anaesthesiologists, hosted at SIMS Shivamogga with workshops, scientific sessions, and hands-on training.',
      keywords:
        'AOACON 2026, AOA conference, obstetric anaesthesia, Shivamogga, SIMS, workshops, anaesthesia conference, Karnataka medical conference',
      robots: 'index, follow',
    };

    const isProtected =
      pathname.startsWith('/admin') ||
      pathname === '/login' ||
      pathname === '/register' ||
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/registration') ||
      pathname.startsWith('/checkout') ||
      pathname.startsWith('/payment-status') ||
      pathname.startsWith('/accommodation') ||
      pathname.startsWith('/conference-days') ||
      pathname.startsWith('/abstract') ||
      pathname.startsWith('/feedback');

    const routes = [
      {
        match: (path) => path === '/',
        title: 'AOACON 2026 | AOA 19th Annual Conference, Shivamogga',
        description:
          'Join AOACON 2026 in Shivamogga for the 19th Annual Conference of the Association of Obstetric Anaesthesiologists featuring workshops, symposia, and hands-on training.',
        keywords:
          'AOACON 2026, AOA, obstetric anaesthesiologists, Shivamogga conference, SIMS, workshops, obstetric anaesthesia',
      },
      {
        match: (path) => path === '/register-details',
        title: 'Registration Fees | AOACON 2026',
        description:
          'View AOACON 2026 registration fees for AOA members, non-members, and PGs & fellows across early bird, regular, and spot phases.',
        keywords: 'AOACON registration fees, AOA Shivamogga, conference fees, early bird',
      },
      {
        match: (path) => path === '/venue',
        title: 'Venue | SIMS Shivamogga | AOACON 2026',
        description:
          'AOACON 2026 venue details at Shimoga Institute of Medical Sciences (SIMS), Shivamogga. Campus highlights, maps, and travel tips.',
        keywords: 'AOACON venue, SIMS Shivamogga, conference location, travel information',
      },
      {
        match: (path) => path === '/committee',
        title: 'Organizing Committee | AOACON 2026',
        description:
          'Meet the organizing, scientific, workshop, and hospitality committees supporting AOACON 2026 in Shivamogga.',
        keywords: 'AOACON committee, organizing committee, scientific committee',
      },
      {
        match: (path) => path === '/contact',
        title: 'Contact | AOACON 2026',
        description:
          'Contact the AOACON 2026 secretariat for registration, venue, and conference queries.',
        keywords: 'AOACON contact, conference secretariat, Shivamogga',
      },
      {
        match: (path) => path === '/download',
        title: 'Brochure | AOACON 2026',
        description:
          'Download the AOACON 2026 conference brochure with program highlights and key information.',
        keywords: 'AOACON brochure, conference download, program highlights',
      },
      {
        match: (path) => path === '/terms',
        title: 'Terms & Conditions | AOACON 2026',
        description: 'Read the terms and conditions for AOACON 2026 registrations and attendance.',
        keywords: 'AOACON terms, conference terms and conditions',
      },
      {
        match: (path) => path === '/cancellation-policy',
        title: 'Cancellation Policy | AOACON 2026',
        description: 'Review the AOACON 2026 cancellation and refund policy.',
        keywords: 'AOACON cancellation policy, refund policy',
      },
      {
        match: (path) => path === '/privacy-policy',
        title: 'Privacy Policy | AOACON 2026',
        description: 'Learn how AOACON 2026 handles your personal information and privacy.',
        keywords: 'AOACON privacy policy, data privacy',
      },
    ];

    const match = routes.find((route) => route.match(pathname));
    const seo = {
      ...defaultSeo,
      ...(match || {}),
      ...(isProtected ? { robots: 'noindex, nofollow' } : {}),
    };

    document.title = seo.title;

    const setMeta = (attr, key, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      if (!href) return;
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    setMeta('name', 'description', seo.description);
    setMeta('name', 'keywords', seo.keywords);
    setMeta('name', 'robots', seo.robots);
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', `${window.location.origin}${pathname}`);
    setMeta('property', 'og:site_name', baseTitle);
    setMeta('name', 'twitter:card', 'summary');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setLink('canonical', `${window.location.origin}${pathname}`);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>

        <Router>
          <ScrollToTop/>
          <SeoManager />
          <div className="App min-h-screen flex flex-col">
            <div className="flex-1">
              <Routes>
              {}
              <Route path="/" element={
                  <HomePage />
              } />
              
              <Route path="/register-details" element={
                  <RegistrationFeesPage />
              } />
              
              <Route path="/venue" element={
                  <VenuePage />
              } />
              
              <Route path="/committee" element={
                  <CommitteePage />
              } />
              
              <Route path="/contact" element={
                  <ContactPage />
              } />
              
              <Route path="/download" element={
                  <BrochurePage />
              } />

              <Route path="/terms" element={
                  <TermsPage />
              } />

              <Route path="/cancellation-policy" element={
                  <CancellationPolicyPage />
              } />

              <Route path="/privacy-policy" element={
                  <PrivacyPolicyPage />
              } />
              
              <Route path="/register" element={
                  <RegisterPage />
              } />

              {}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/registration" element={
                <ProtectedRoute>
                  <RegistrationPage />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/payment-status" element={
                <ProtectedRoute>
                  <PaymentStatusPage />
                </ProtectedRoute>
              } />
              <Route path="/accommodation" element={
                <ProtectedRoute>
                  <AccommodationListPage />
                </ProtectedRoute>
              } />
              <Route path="/accommodation/:id" element={
                <ProtectedRoute>
                  <AccommodationDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/accommodation/checkout" element={
                <ProtectedRoute>
                  <AccommodationCheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/conference-days" element={
                <ProtectedRoute>
                  <ConferenceDaysPage />
                </ProtectedRoute>
              } />
              <Route path="/abstract/rules" element={
                <ProtectedRoute>
                  <AbstractRulesPage />
                </ProtectedRoute>
              } />
              <Route path="/abstract/upload" element={
                <ProtectedRoute>
                  <AbstractUploadPage />
                </ProtectedRoute>
              } />
              <Route path="/feedback" element={
                <ProtectedRoute>
                  <FeedbackPage />
                </ProtectedRoute>
              } />

              {}
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              } />
              <Route path="/admin/registrations" element={
                <AdminRoute>
                  <RegistrationsManagementPage />
                </AdminRoute>
              } />
              <Route path="/admin/accommodations" element={
                <AdminRoute>
                  <AccommodationManagementPage />
                </AdminRoute>
              } />
              <Route path="/admin/payments" element={
                <AdminRoute>
                  <PaymentsManagementPage />
                </AdminRoute>
              } />
              <Route path="/admin/abstracts" element={
                <AdminRoute>
                  <AbstractReviewPage />
                </AdminRoute>
              } />
              <Route path="/admin/feedback" element={
                <AdminRoute>
                  <FeedbackViewerPage />
                </AdminRoute>
              } />

              {}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              
              {}
              <Route path="*" element={
                <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                  <div className="text-center max-w-md">
                    <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-4">404</h1>
                    <p className="text-lg text-slate-600 mb-8">Page not found</p>
                    <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#005aa9] text-white rounded-xl hover:bg-[#004684] transition-colors font-medium shadow-sm hover:shadow-md">
                      Go Home
                    </a>
                  </div>
                </div>
              } />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
