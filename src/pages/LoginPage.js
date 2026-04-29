import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import ErrorBox from "../components/ErrorBox";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const nav = useNavigate();
  const { login, error, loading } = useAuthStore();
  const submit = async (data) => {
    const user = await login(data);
    console.log(user.user, "dgfdgdfngnfd");
    if (user) {
      if (user?.user.role === "admin") {
        nav("/admin-dashboard");
      } else {
        nav("/projects");
      }
    }
  };
  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light px-3">
      <div
        className="card border-0 shadow-lg rounded-4 w-100"
        style={{ maxWidth: "430px" }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h1 className="fw-bold mb-2">Project Manager</h1>
            <p className="text-muted mb-0">Sign in to continue</p>
          </div>
          <ErrorBox message={error} />
          <LoginForm onSubmit={submit} />
          {loading && (
            <div className="text-center mt-3">
              <div className="spinner-border spinner-border-sm"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
