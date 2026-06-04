import FacilitiesBody from "../components/facalities/FacilitiesBody";
import FacilitiesHeader from "../components/facalities/FacilitiesHeader";
import { Outlet, useLocation } from "react-router-dom";

const Facilities = () => {
  const location = useLocation();

  return (
    <div>
      <FacilitiesHeader />

      {/* Show FacilitiesBody only on /facilities */}
      {location.pathname === "/facilities" && <FacilitiesBody />}

      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
};

export default Facilities;