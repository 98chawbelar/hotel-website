import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getProfile } from "../api/admin.api";
import { setAdmin, clearAdmin, getToken } from "../utils/auth";

const AdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verify = async () => {
      const token = getToken();

      if (!token) {
        clearAdmin();
        setAuth(false);
        setLoading(false);
        return;
      }

      try {
        const res = await getProfile();
        setAdmin(res.data); // backend profile
        setAuth(true);
      } catch (err) {
        clearAdmin();
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  );
};

export default AdminRoute;
