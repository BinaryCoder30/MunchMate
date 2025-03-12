import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom"; // ❌ Removed BrowserRouter here
// import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

// Lazy Loading Pages for Better Performance
const Home = lazy(() => import("./Pages/Home"));
const Profile = lazy(() => import("./Pages/Profile"));
const AuthForm = lazy(() => import("./Pages/SignUp"));
const LoginPage = lazy(() => import("./Pages/Login"));
const Restaurant = lazy(() => import("./Pages/Restaurant"));

function App() {
  return (
    // <AuthProvider> {/* Wrap everything inside AuthProvider */}
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<AuthForm />} /> {/* Lowercase route path */}
          <Route path="/login" element={<LoginPage />} /> {/* Lowercase route path */}
          <Route path="/restaurant" element={<Restaurant />} /> 
        </Routes>
      </Suspense>
    // {/* </AuthProvider> */}
  );
}

export default App;
