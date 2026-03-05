import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    // send them to login and remember where they tried to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}