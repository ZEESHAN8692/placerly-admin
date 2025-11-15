import React from "react";
import { HiOutlineUserGroup, HiOutlineClipboardList } from "react-icons/hi";
import { FiBookOpen } from "react-icons/fi";
import Layout from "../layout/layout";
import { useQuery } from "@tanstack/react-query";
import { admin_dashboard } from "../queryFuction/queryFunction";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: admin_dashboard,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="p-10 text-center text-white">Loading dashboard...</div>
      </Layout>
    );
  }

  if (isError || !data) {
    return (
      <Layout>
        <div className="p-10 text-center text-red-500">Error loading dashboard</div>
      </Layout>
    );
  }

  // API DATA
  const totalUsers = data?.users || 0;
  const totalSubscriptions = data?.subscriptions || 0;
  const totalBlogs = data?.blogs || 0;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <HiOutlineUserGroup className="w-8 h-8" />,
      color: "bg-blue-500",
    },
    {
      title: "Total Subscriptions",
      value: totalSubscriptions,
      icon: <HiOutlineClipboardList className="w-8 h-8" />,
      color: "bg-green-500",
    },
    {
      title: "Total Blogs",
      value: totalBlogs,
      icon: <FiBookOpen className="w-8 h-8" />,
      color: "bg-purple-500",
    },
  ];

  const chartData = [
    { label: "Users", value: totalUsers, color: "from-blue-500 to-blue-400" },
    { label: "Subscriptions", value: totalSubscriptions, color: "from-green-500 to-green-400" },
    { label: "Blogs", value: totalBlogs, color: "from-purple-500 to-purple-400" },
  ];

  return (
    <Layout>

      {/* ⭐ ANIMATED WELCOME BOX ⭐ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl border border-blue-400"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          Welcome Back, Admin 👋
        </h1>
        <p className="text-blue-100 text-sm">
          Here's a quick overview of your platform activity.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl p-6 shadow-lg bg-gray-800 border border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Chart 1 */}
        <div className="rounded-2xl p-6 shadow-lg bg-gray-800 border border-gray-700">
          <h3 className="text-lg font-semibold mb-6">Platform Overview</h3>
          <div className="flex items-end justify-between h-56">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                <div
                  className={`w-full rounded-t-lg bg-gradient-to-t ${item.color} shadow-md transition-all duration-700`}
                  style={{ height: `${item.value * 5}px` }}
                />
                <span className="mt-2 text-xs text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2 */}
        <div className="rounded-2xl p-6 shadow-lg bg-gray-800 border border-gray-700">
          <h3 className="text-lg font-semibold mb-6">Growth Stats</h3>
          <div className="flex items-end justify-between h-56">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                <div
                  className={`w-full rounded-t-lg bg-gradient-to-t ${item.color} shadow-md transition-all duration-700`}
                  style={{ height: `${item.value * 6}px` }}
                />
                <span className="mt-2 text-xs text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;
