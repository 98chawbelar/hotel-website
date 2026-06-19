import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUserShield,
  FaUserPlus,
} from "react-icons/fa";

import { registerAdmin } from "../../../api/admin.api";

import PageHeader from "../../../pages/adminPage/components/PageHeader";
import StatCard from "../../../pages/adminPage/components/StatCard";

const AdminRegister = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");

  const { register, handleSubmit, watch } = useForm();

  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setMessage("");

      await registerAdmin({
        username: data.username,
        password: data.password,
      });

      alert("Admin registered successfully");

      navigate("/admin-login");
    } catch (error) {
      console.error(error);

      setMessage(error?.response?.data?.message || "Registration failed");
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
              title="Admin Registration"
              subtitle="Create a secure dashboard account for Kandaw101 Hotel."
            />

            <div className="mt-10">
              <div className="w-full h-20 rounded-3xl flex items-center justify-center">
                <FaUserShield className="text-accent text-4xl" />
              </div>

              <p className="uppercase tracking-[5px] text-center text-accent text-xs mt-2 mb-3">
                Secure Registration
              </p>

              <h1 className="text-4xl mt-8 sm:text-5xl font-black text-secondary leading-tight">
                Create Account
              </h1>

              <p className="text-secondary/45 mt-2 leading-8 max-w-md">
                Register a new admin account to manage rooms, bookings,
                facilities, and hotel operations securely.
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="flex flex-col md:flex-row gap-4  mt-10">
            <StatCard
              title="Secure Access"
              value="Protected"
              icon={<FaLock />}
              borderColor="border-accent"
              iconBg="bg-secondary/10"
              iconColor="text-accent"
            />

            <StatCard title="New Admin" value="Create" icon={<FaUserPlus />} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* TITLE */}
            <div className="mb-8">
              <p className="uppercase tracking-[5px] text-accent text-xs mb-3">
                Admin Register
              </p>

              <h2 className="text-3xl sm:text-4xl font-black text-secondary">
                Register
              </h2>
            </div>

            {/* USERNAME */}
            <div className="mb-6">
              <label className="block text-secondary/80 text-sm mb-3">
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="Enter username"
                {...register("username", {
                  required: "username is required",
                })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-accent transition"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <label className="block text-secondary/80 text-sm mb-3">
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
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

            {/* CONFIRM PASSWORD */}
            <div className="mb-5">
              <label className="block text-secondary/80 text-sm mb-3">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-accent transition"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary/50 hover:text-accent transition"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
              <FaUserPlus />
              Create Admin Account
            </button>

            {/* LOGIN */}
            <div className="mt-8 text-center">
              <p className="text-secondary/50 text-sm">
                Already have an admin account?
              </p>

              <Link
                to="/admin-login"
                className="inline-block mt-2 text-accent hover:text-accent/80 font-medium transition"
              >
                Login Here
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

export default AdminRegister;
