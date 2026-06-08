import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setAdmin } from "../../../utils/auth";
import { loginAdmin } from "../../../api/admin.api";

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
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>

            <input
              {...register("username", {
                required: true,
              })}
              type="text"
              id="username"
              placeholder="Enter username"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                })}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none focus:shadow"
              />

              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          {/* Login Button */}
          <div className="w-full">
            <button
              type="submit"
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
            >
              Login
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an admin account?
            </p>

            <Link
              to="/admin-register"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Register First
            </Link>
          </div>
        </form>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2026 Kandaw101Hotel. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
