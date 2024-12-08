import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "../../store/actions/authActions.js";

const ProtectedRoutes = ({ children, allowedRoles, requiresAuth = true, noAuth = false }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  if (noAuth) {
    return isAuthenticated ? <Navigate to="/" replace /> : children;
  }

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  if (user && (user.role === 1 || user.role === 2) && user.active === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md w-full">
          <strong className="font-bold text-5xl">Access Restricted! </strong>
          <span className="block sm:inline text-2xl">
            Your account is currently restricted. Please contact the administrator for assistance.
          </span>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoutes;