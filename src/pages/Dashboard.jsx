import React from "react";

import { HiOutlineUserGroup, HiOutlineOfficeBuilding, HiOutlineChatAlt2 } from "react-icons/hi";
import { FiBarChart2, FiTrendingUp, FiUserPlus } from "react-icons/fi";
import Layout from "../layout/layout";

const Dashboard = () => {
  const stats = [
    { title: "Total Registered Users", value: "12,546", icon: <HiOutlineUserGroup className="w-8 h-8" />, color: "bg-blue-500", trend: "+12%" },
    { title: "Total Organizations", value: "893", icon: <HiOutlineOfficeBuilding className="w-8 h-8" />, color: "bg-green-500", trend: "+8%" },
    { title: "Total Received Queries", value: "3,210", icon: <HiOutlineChatAlt2 className="w-8 h-8" />, color: "bg-purple-500", trend: "+23%" },
  ];

  const subscriptionTrends = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 78 },
    { month: "Mar", value: 82 },
    { month: "Apr", value: 90 },
    { month: "May", value: 95 },
    { month: "Jun", value: 105 },
  ];

  const userGrowth = [
    { week: "Week 1", value: 30 },
    { week: "Week 2", value: 45 },
    { week: "Week 3", value: 60 },
    { week: "Week 4", value: 72 },
  ];

  return (
    <Layout>
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-blue-100 text-sm sm:text-base">Here's what's happening with your platform today.</p>
          </div>
          <FiBarChart2 className="hidden sm:block w-10 h-10 text-white opacity-30" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-2xl p-5 sm:p-6 shadow-lg bg-gray-800 border border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-2 text-gray-400">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-bold mb-2">{stat.value}</p>
                <span className="text-green-500 text-sm font-medium flex items-center">
                  <FiTrendingUp className="w-4 h-4 mr-1" /> {stat.trend}
                </span>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Subscription Trends */}
        <div className="rounded-2xl p-5 sm:p-6 shadow-lg bg-gray-800 border border-gray-700">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <FiTrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold">Subscription Trends</h3>
                <p className="text-xs sm:text-sm text-gray-400">Last 6 Months</p>
              </div>
            </div>
            <div className="flex items-center text-green-500 font-medium text-sm">
              <FiTrendingUp className="w-4 h-4 mr-1" /> +15%
            </div>
          </div>
          <div className="flex items-end justify-between h-40 sm:h-48">
            {subscriptionTrends.map((trend, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 shadow-md transition-all duration-500"
                  style={{ height: `${trend.value}%` }}
                ></div>
                <span className="mt-2 text-xs font-medium text-gray-400">{trend.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Growth */}
        <div className="rounded-2xl p-5 sm:p-6 shadow-lg bg-gray-800 border border-gray-700">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <FiUserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold">User Growth</h3>
                <p className="text-xs sm:text-sm text-gray-400">Last 30 Days</p>
              </div>
            </div>
            <div className="flex items-center text-green-500 font-medium text-sm">
              <FiTrendingUp className="w-4 h-4 mr-1" /> +20%
            </div>
          </div>
          <div className="flex items-end justify-between h-40 sm:h-48">
            {userGrowth.map((growth, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-purple-500 to-purple-400 shadow-md transition-all duration-500"
                  style={{ height: `${growth.value}%` }}
                ></div>
                <span className="mt-2 text-xs font-medium text-gray-400">{growth.week}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
