import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FiMenu, FiChevronDown, FiBell, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { logout, profile } from "../queryFuction/queryFunction";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const navigate= useNavigate()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const {data , isLoading, isError} = useQuery({
    queryKey: ['user'],
    queryFn: profile
  })
  // console.log("Profile",data.name);

  const logoutHandhle =async ()=>{
    await logout()
    sessionStorage.clear();
    // Cookies.remove("token");
    // Cookies.remove("subscriptionActive");
    navigate("/", { replace: true });

  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-20 bg-gray-800 border-b border-gray-700 shadow-sm">
      <div className="px-4 sm:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg md:hidden hover:bg-gray-700 text-gray-300 hover:text-white"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <Link to="/dashboard" className="cursor-pointer">
            <h1 className="ml-3 sm:ml-4 text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Placerly
            </h1>
          </Link>
          
        </div>

        <div className="flex items-center space-x-3 sm:space-x-5 relative">
          <button className="p-2 rounded-xl hover:bg-gray-700 text-gray-300 relative">
            <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1"></div>
            <FiBell className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded-lg"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg">
                {data?.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-medium text-sm sm:text-base">{data?.name}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
              <FiChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                <Link to="/dashboard/profile">
                  <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer">
                    <FiUser className="mr-2" /> Profile
                  </button>
                </Link>
                <Link to="/dashboard/settings">
                  <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer">
                    <FiSettings className="mr-2" /> Settings
                  </button>
                </Link>
                <hr className="border-gray-700" />
                <button className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 cursor-pointer"
                  onClick={logoutHandhle}
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
