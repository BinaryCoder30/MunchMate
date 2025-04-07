import React, { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Added Navigate import

// Lazy Loading Pages for Better Performance
const Home = lazy(() => import("./Pages/Home"));
const Profile = lazy(() => import("./Pages/Profile"));
const AuthForm = lazy(() => import("./Pages/SignUp"));
const LoginPage = lazy(() => import("./Pages/Login"));
const Restaurant = lazy(() => import("./Pages/Restaurant"));

// Admin Routes
const AdminDashboard = lazy(() => import("./Pages/Admin/Dashboard/AdminDashboard"));
const AdminLogin = lazy(() => import("./Pages/Admin/Auth/LoginPage"));
const AdminSignup = lazy(() => import("./Pages/Admin/Auth/SignUpAdmin"));
const AdminOverview = lazy(() => import("./Pages/Admin/Tabs/OverviewTab"));
const AdminOrders = lazy(() => import("./Pages/Admin/Tabs/OrdersTab"));
const AdminMenu = lazy(() => import("./Pages/Admin/Tabs/MenuTab"));
const AdminProfitLoss = lazy(() => import("./Pages/Admin/Tabs/ProfitLossTab"));
const AdminDeliveries = lazy(() => import("./Pages/Admin/Tabs/DeliveriesTab"));
const AdminCustomerStats = lazy(() => import("./Pages/Admin/Tabs/CustomerStatsTab"));
const AdminSettings = lazy(() => import("./Pages/Admin/Tabs/SettingsTab"));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="text-center mt-10">Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/restaurant" element={<Restaurant />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route index element={<AdminOverview />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="profit-loss" element={<AdminProfitLoss />} />
            <Route path="deliveries" element={<AdminDeliveries />} />
            <Route path="customer-stats" element={<AdminCustomerStats />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;