import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";

import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
        {/* HIDE NAVBAR */}
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <Navbar />}

        {/* MAIN */}
        <main className="flex-1 w-full">
          <Outlet />
        </main>

        {/* HIDE TESTIMONIALS */}
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <Testimonials />}

        {/* HIDE FOOTER */}
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <Footer className="flex-1 w-full" />
          )}
      </div>
    </AuthProvider>
  );
};

export default App;
