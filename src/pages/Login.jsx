import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../queryFuction/queryFunction";
import { toast } from "react-toastify";

const PlacerlyLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {

      sessionStorage.setItem("token", data?.token);
      toast.success("Login successful");

      console.log(data?.token)
      navigate("/dashboard")
    },
    onError: (err) => {
      toast.error(`Login failed: ${err.message}`);
      console.error('Login error:', err.message);
    }

  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    mutate(formData)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row bg-gray-900/70 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">

        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16">
          <div className="max-w-md mx-auto">
            <div className="text-center lg:text-left mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">
                Admin Login — Placerly
              </h1>
              <p className="text-gray-400 text-lg text-center">
                Welcome back, admin. Sign in to manage your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-950 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-950 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#1E6CFF] hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-700"></div>
              <div className="mx-4 text-gray-400 text-sm">OR</div>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-800/40 text-gray-200 transition duration-200">
                <FaGoogle className="w-5 h-5 mr-2 text-[#1E6CFF]" />
                Google
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-800/40 text-gray-200 transition duration-200">
                <FaFacebook className="w-5 h-5 mr-2 text-blue-400" />
                Facebook
              </button>
            </div>


          </div>
        </div>

        {/* Right Side - Image */}
        <div
          className="hidden lg:block w-1/2 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1470&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-[#1E6CFF] mix-blend-multiply"></div>
        </div>
      </div>
    </div>
  );
};

export default PlacerlyLogin;
