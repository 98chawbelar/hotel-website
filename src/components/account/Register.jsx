import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { registerUser, signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();

      alert("Register successful!");

      navigate("/");
    } catch (error) {
      alert("Google Sign-In Failed!");

      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password, data.phone);

      alert("Register successful!");

      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("Email is already registered");
      } else {
        setMessage("Registration Failed");
      }

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-10 bg-linear-to-br from-primary via-[#10233B] to-black overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute w-75 h-75 bg-accent/20 blur-3xl  rounded-full top-20 left-20" />

      <div className="absolute w-63 h-63 bg-primary/40 blur-3xl rounded-full bottom-20 right-20" />

      {/* REGISTER CARD */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg backdrop-blur-2xl bg-white/10 border border-white/10 shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-10">
        {/* BRAND */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary">
            Kandaw101Hotel
          </h1>

          <p className="text-secondary/60 mt-2 text-sm sm:text-base">
            Create your luxury hotel account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* EMAIL */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-secondary text-sm mb-2"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-secondary placeholder-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
            />

            {errors.email && (
              <p className="text-red-400 text-xs mt-2">Email is required</p>
            )}
          </div>
          {/* Phone */}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block text-secondary text-sm mb-2"
            >
              Phone Number
            </label>

            <input
              type="phone"
              id="phone"
              placeholder="Phone Number Please"
              {...register("phone", { required: true })}
              className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-secondary placeholder-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
            />

            {errors.phone && (
              <p className="text-red-400 text-xs mt-2">
                Phone Number is required
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-secondary text-sm mb-2"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                {...register("password", { required: true })}
                className="w-full h-12 px-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-secondary placeholder-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-secondary/60 hover:text-accent transition"
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

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent/80 text-black font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
          >
            Create Account
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />

          <span className="text-secondary/50 text-xs">OR</span>

          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* GOOGLE SIGN IN */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-medium hover:bg-secondary transition duration-300"
        >
          <FaGoogle />
          Continue with Google
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-secondary/70 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline font-medium">
            Login
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

export default Register;
