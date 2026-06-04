import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import { useForm } from "react-hook-form";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // GOOGLE LOGIN
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome Back",
        background: "#0B1B2B",
        color: "#fff",
        iconColor: "#d4af37",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        background: "#0B1B2B",
        color: "#fff",
        iconColor: "#d00018",
        text: "Please try again!",
      });

      console.error(error);
    }
  };

  // EMAIL LOGIN
  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome Back",
        background: "#0B1B2B",
        color: "#fff",
        iconColor: "#d4af37",
      });

      navigate("/");
    } catch (error) {
      setMessage("Invalid email or password");

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#0B1B2B] via-primary to-black px-4 sm:px-6 md:px-8 py-10">
      {/* LOGIN CARD */}
      <div className="w-full max-w-md sm:max-w-lg bg-secondary/10 backdrop-blur-xl border border-secondary/20 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
        {/* BRAND */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary">
            Kandaw101Hotel
          </h1>

          <p className="text-secondary/60 mt-2 text-sm sm:text-base">
            Luxury Stay & Premium Experience
          </p>
        </div>

        {/* TITLE */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome Back 👋
          </h2>

          <p className="text-secondary/60 text-sm mt-2">
            Login to continue your journey
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* EMAIL */}
          <div className="mb-5">
            <label
              className="block text-sm text-secondary/80 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              {...register("email", {
                required: true,
              })}
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-secondary/10 text-white placeholder-secondary/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />

            {errors.email && (
              <p className="text-red-400 text-xs mt-2">Email is required</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <label
              className="block text-sm text-secondary/80 mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                {...register("password", {
                  required: true,
                })}
                className="w-full h-12 px-4 pr-12 rounded-xl bg-white/5 border border-secondary/10 text-white placeholder-secondary/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />

              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-secondary/50 hover:text-accent transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errors.password && (
              <p className="text-red-400 text-xs mt-2">Password is required</p>
            )}
          </div>

          {/* ERROR MESSAGE */}
          {message && <p className="text-red-400 text-sm mb-4">{message}</p>}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent/80 text-black font-semibold py-3 rounded-xl transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-secondary/10" />

          <span className="text-xs text-secondary/50">OR</span>

          <div className="h-px flex-1 bg-secondary/10" />
        </div>

        {/* GOOGLE BUTTON */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-3 rounded-xl hover:bg-gray-200 transition duration-300 cursor-pointer"
        >
          <FaGoogle />
          Continue with Google
        </button>

        {/* REGISTER */}
        <p className="text-center text-sm text-secondary/60 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-accent hover:underline">
            Register
          </Link>
        </p>

        {/* FOOTER */}
        <p className="text-center mt-8 text-secondary/40 text-xs">
          © 2026 Kandaw101Hotel. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
