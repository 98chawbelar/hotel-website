import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Rooms from "../pages/Rooms";
import Facilities from "../pages/Facilities";

import Gym from "../components/facalities/Gym";
import Laundry from "../components/facalities/Laundry";
import Restaurant from "../components/facalities/Restaurant";
import SwimmingPool from "../components/facalities/SwimmingPool";
import Booking from "../pages/Booking";
import RoomDetails from "../pages/RoomsDetails";
import LogIn from "../components/account/Login";
import Register from "../components/account/Register";
import AdminLogin from "../components/account/admin/AdminLogin";
import { PrivateRoute } from "./PrivateRoute";
import About from "../pages/About";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddRoom from "../pages/dashboard/addRoom/AddRoom";
import UpdateRoom from "../pages/dashboard/editRoom/EditRoom";
import ManageRooms from "../pages/dashboard/manageRoom/ManageRoom";
import ManageBooking from "../pages/dashboard/manageBooking/ManageBooking";
import AdminRoute from "./AdminRoute";
import AddFacilities from "../pages/dashboard/addFacilities/AddFacilities";
import AddExtraFacilities from "../pages/dashboard/addExtraFacilities/AddExtraFacilities";
import AdminRegister from "../components/account/admin/AdminRegister";
import AdminProfile from "../components/account/admin/AdminProfile";
import { elements } from "chart.js";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      // Facilities Main Page
      {
        path: "/facilities",
        element: <Facilities />,
      },

      // Separate Facility Pages
      {
        path: "/facilities/gym",
        element: <Gym />,
      },
      {
        path: "/facilities/laundry",
        element: <Laundry />,
      },
      {
        path: "/facilities/restaurant",
        element: <Restaurant />,
      },
      {
        path: "/facilities/pool",
        element: <SwimmingPool />,
      },

      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/rooms/:id",
        element: <RoomDetails />,
      },
      {
        path: "/booking",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin-register",
    element: (
      <div>
        <AdminRegister />
      </div>
    ),
  },
  {
    path: "/admin-login",
    element: (
      <div>
        <AdminLogin />
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: <AdminRoute />, // ONLY route guard here
    children: [
      {
        element: <DashboardLayout />, // layout wrapper
        children: [
          { index: true, element: <Dashboard /> },
          { path: "profile", element: <AdminProfile /> },
          { path: "add-new-room", element: <AddRoom /> },
          { path: "edit-room/:id", element: <UpdateRoom /> },
          { path: "manage-rooms", element: <ManageRooms /> },
          { path: "manage-booking", element: <ManageBooking /> },
          { path: "add-facilities", element: <AddFacilities /> },
          { path: "add-extra-facilities", element: <AddExtraFacilities /> },
        ],
      },
    ],
  },
]);

export default Router;
