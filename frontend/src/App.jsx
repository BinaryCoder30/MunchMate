import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Pages/Profile";

function App() {
  return (
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
  );
}

export default App;
