import React, { use } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiUsers, FiSettings, FiFileText, FiCreditCard,
  FiHelpCircle, FiBook, FiHeadphones, FiPieChart
} from "react-icons/fi";

const Sidebar = ({ sidebarOpen, toggleSidebar, activeSection, setActiveSection }) => {
  const path = useLocation().pathname;
  const menuItems = [
    { name: "Dashboard", icon: <FiPieChart className="w-5 h-5" />, link: "/dashboard" },
    { name: "User Management", icon: <FiUsers className="w-5 h-5" />, link: "/dashboard/users" },
    { name: "CMS Management", icon: <FiFileText className="w-5 h-5" />, link: "/dashboard/cms" },
    { name: "Subscription", icon: <FiCreditCard className="w-5 h-5" />, link: "/dashboard/subscription" },
    { name: "FAQ Management", icon: <FiHelpCircle className="w-5 h-5" />, link: "/dashboard/faq" },
    { name: "Blog Management", icon: <FiBook className="w-5 h-5" />, link: "/dashboard/blogs" },
    { name: "Banner Management", icon: <FiBook className="w-5 h-5" />, link: "/dashboard/banner" },
    { name: "Support", icon: <FiHeadphones className="w-5 h-5" />, link: "/dashboard/support" },
    { name: "Settings", icon: <FiSettings className="w-5 h-5" />, link: "/dashboard/settings" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-20 h-screen pt-20 transition-transform duration-300 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:w-64 bg-gradient-to-b from-blue-900/20 to-gray-900 border-r border-gray-700 shadow-xl`}
    >
      <div className="h-full px-4 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                onClick={() => setActiveSection(item.name)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                    path === item.link
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "hover:bg-blue-800/30 text-gray-300 hover:text-white"
                }`}
              >
                <span
                  className={`${
                    activeSection === item.name
                      ? "scale-110"
                      : "group-hover:scale-110"
                  } transition-transform duration-200`}
                >
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
