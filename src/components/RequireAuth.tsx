import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/ContextApi";

const RequireAuth = () => {
  
  const { user } = useAuth();

  if (!user?.accessToken) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet/>
};

export default RequireAuth;