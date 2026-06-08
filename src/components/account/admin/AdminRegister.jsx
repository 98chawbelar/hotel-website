import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import getBaseUrl from "../../../utils/baseURL";
import { registerAdmin } from "../../../api/admin.api";

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
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Admin Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter username"
              {...register("username", {
                required: "Username is required",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
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
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none"
              />

              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
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
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none"
              />

              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {message && <p className="text-red-500 text-sm mb-3">{message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an admin account?{" "}
          <Link to="/admin-login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2026 Kandaw101Hotel. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
