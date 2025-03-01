import { Navigate } from "react-router";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";

export default function AuthRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
