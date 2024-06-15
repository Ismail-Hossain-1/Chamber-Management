import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";





const AuthenticatedRoute = ({ children }) => {
    const { authUser } = useAuthContext();
  
    if (!authUser) {
      return <Navigate to="/login" replace />;  // Redirect to login if not authenticated
    }
  
    return children;
  };
  
  export default AuthenticatedRoute;