import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {

  const token = localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        {/* Default Route */}

        <Route
          path="/"
          element={
            token
            ? <Navigate to="/dashboard" />
            : <Navigate to="/register" />
          }
        />

        {/* Register */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            token
            ? <Dashboard />
            : <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}