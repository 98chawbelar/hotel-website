import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUserShield,
  FaHotel,
} from "react-icons/fa";

import { setAdmin } from "../../../utils/auth";
import { loginAdmin } from "../../../api/admin.api";

import PageHeader from "../../../pages/adminPage/components/PageHeader";
import StatCard from "../../../pages/adminPage/components/StatCard";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setMessage("");

      const res = await loginAdmin(data);

      const token = res.data?.token;
      const user = res.data?.user;

      if (!token) {
        throw new Error("Token missing from backend response");
      }

      localStorage.setItem("token", token);
      setAdmin(user);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);
      setMessage(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-primary flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      {/* BACKGROUND BLUR */}
      <div className="absolute top-1/2 left-1/2 w-125 h-125 bg-secondary/10 blur-[220px] rounded-full -translate-x-1/2 -translate-y-1/2" />

      {/* TOP LINE */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-secondary/40 to-transparent" />

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 rounded-[36px] overflow-hidden shadow-2xl border border-secondary/5 backdrop-blur-2xl bg-secondary/10">
        {/* LEFT SIDE */}
        <div className="relative p-8 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-0 flex flex-col justify-between">
          {/* HEADER */}
          <div>
            <PageHeader
              title="Admin Dashboard"
              subtitle="Luxury hotel management access for Kandaw101 Hotel."
            />

            <div className="mt-10">
              <div className="w-full h-20 rounded-3xl  flex items-center justify-center">
                <FaUserShield className="text-accent text-4xl" />
              </div>

              <p className="uppercase tracking-[5px] text-center text-accent text-xs mt-2 mb-3">
                Secure Access
              </p>

              <h1 className="text-4xl mt-8 sm:text-5xl font-black text-secondary leading-tight">
                Welcome Back
              </h1>

              <p className="text-secondary/45 mt-2 leading-8 max-w-md">
                Login to manage hotel bookings, rooms, facilities, guests, and
                all dashboard operations securely.
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <StatCard
              title="Secure Dashboard"
              value="24/7"
              icon={<FaLock />}
              borderColor="border-accent"
              iconBg="bg-secondary/10"
              iconColor="text-accent"
            />

            <StatCard
              title="Hotel Management"
              value="All In One"
              icon={<FaHotel />}
              borderColor="border-primary"
              iconBg="bg-secondary/10"
              iconColor="text-primary"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* LOGIN TITLE */}
            <div className="mb-8">
              <p className="uppercase tracking-[5px] text-accent text-xs mb-3">
                Admin Login
              </p>

              <h2 className="text-3xl sm:text-4xl font-black text-secondary">
                Login
              </h2>
            </div>

            {/* USERNAME */}
            <div className="mb-6">
              <label className="block text-secondary/80 text-sm mb-3">
                Username
              </label>

              <input
                {...register("username", {
                  required: true,
                })}
                type="text"
                placeholder="Enter username"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-accent transition"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-5">
              <label className="block text-secondary/80 text-sm mb-3">
                Password
              </label>

              <div className="relative">
                <input
                  {...register("password", {
                    required: true,
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-accent transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary/50 hover:text-accent transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {message && (
              <div className="mb-5 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3">
                <p className="text-red-400 text-sm">{message}</p>
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-accent text-primary py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] transition duration-300 shadow-2xl"
            >
              <FaLock />
              Login To Dashboard
            </button>

            {/* REGISTER */}
            <div className="mt-8 text-center">
              <p className="text-secondary/50 text-sm">
                Don't have an admin account?
              </p>

              <Link
                to="/admin-register"
                className="inline-block mt-2 text-accent hover:text-accent/80 font-medium transition"
              >
                Register First
              </Link>
            </div>
          </form>

          {/* FOOTER */}
          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-secondary/40 text-xs tracking-wide">
              ©2026 Kandaw101Hotel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
