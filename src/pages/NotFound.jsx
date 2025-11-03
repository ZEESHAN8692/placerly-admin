import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1F3A] to-[#08101D] p-8 text-center relative overflow-hidden">

      {/* Background Glow Circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#155DFC]/30 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#2D7AFC]/30 rounded-full blur-[120px] opacity-40" />

      {/* Animated Illustration */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 mb-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="180"
          height="180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2D7AFC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.5" />
          <path d="M9 9l6 6M15 9l-6 6" />
        </svg>
      </motion.div>

      {/* 404 Text */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-7xl font-extrabold text-[#F8FAFC]"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-[#F8FAFC]/70 text-lg mt-4 max-w-md"
      >
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/")}
        className="mt-8 bg-gradient-to-r from-[#155DFC] to-[#2D7AFC] hover:from-[#2D7AFC] hover:to-[#155DFC] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-[#155DFC]/30 transition-all duration-300 flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Dashboard
      </motion.button>

      {/* Subtle Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 text-xs text-[#F8FAFC]/40"
      >
        Placerly © {new Date().getFullYear()} 
        {/* — Crafted with 💙 by Z Global Web Tech */}
      </motion.p>
    </div>
  );
};

export default NotFound;
