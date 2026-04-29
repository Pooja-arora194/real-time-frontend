import { BrowserRouter, Routes, Route, } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import TaskBoardPage from "./pages/TaskBoardPage";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/RegisterPage";
import Layout from "./components/Layout";
import PublicRoute from "./components/PublicRoute";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
export default function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const user = useAuthStore((state) => state.loginUser);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  console.log(user, "fdfjhdfhjdfhdjfjhjh");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route element={<Layout />}>
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute role="user">
                <ProjectsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/board/:projectId"
            element={
              <PrivateRoute role="user">
                <TaskBoardPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
