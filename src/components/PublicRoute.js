import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const user = localStorage.getItem("token");

  if (user) {
    return <Navigate to="/projects" />;
  }

  return children;
}
