import React, { useState } from 'react';
import { 
  FiMenu, FiUsers, FiSettings, FiFileText, FiCreditCard, 
  FiHelpCircle, FiBook, FiHeadphones, FiPieChart, 
  FiUserPlus, FiTrendingUp, FiBarChart2, FiChevronDown, FiBell
} from 'react-icons/fi';
import { HiOutlineUserGroup, HiOutlineOfficeBuilding, HiOutlineChatAlt2 } from 'react-icons/hi';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { name: 'Dashboard', icon: <FiPieChart className="w-5 h-5" /> },
    { name: 'User Management', icon: <FiUsers className="w-5 h-5" /> },
    { name: 'CMS Management', icon: <FiFileText className="w-5 h-5" /> },
    { name: 'Subscription', icon: <FiCreditCard className="w-5 h-5" /> },
    { name: 'FAQ Management', icon: <FiHelpCircle className="w-5 h-5" /> },
    { name: 'Blog Management', icon: <FiBook className="w-5 h-5" /> },
    { name: 'Support', icon: <FiHeadphones className="w-5 h-5" /> },
    { name: 'Settings', icon: <FiSettings className="w-5 h-5" /> }
  ];

  const stats = [
    { title: 'Total Registered Users', value: '12,546', icon: <HiOutlineUserGroup className="w-8 h-8" />, color: 'bg-blue-500', trend: '+12%' },
    { title: 'Total Organizations', value: '893', icon: <HiOutlineOfficeBuilding className="w-8 h-8" />, color: 'bg-green-500', trend: '+8%' },
    { title: 'Total Received Queries', value: '3,210', icon: <HiOutlineChatAlt2 className="w-8 h-8" />, color: 'bg-purple-500', trend: '+23%' }
  ];

  const subscriptionTrends = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 82 },
    { month: 'Apr', value: 90 },
    { month: 'May', value: 95 },
    { month: 'Jun', value: 105 }
  ];

  const userGrowth = [
    { week: 'Week 1', value: 30 },
    { week: 'Week 2', value: 45 },
    { week: 'Week 3', value: 60 },
    { week: 'Week 4', value: 72 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white transition-all duration-300">

      {/* Navbar */}
      <nav className="fixed top-0 right-0 left-0 z-20 bg-gray-800 border-b border-gray-700 shadow-sm">
        <div className="px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg md:hidden hover:bg-gray-700 text-gray-300 hover:text-white"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <h1 className="ml-3 sm:ml-4 text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Placerly
            </h1>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <button className="p-2 rounded-xl hover:bg-gray-700 text-gray-300 relative">
              <div className="relative">
                <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1"></div>
                <FiBell className="w-5 h-5" />
              </div>
            </button>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-lg">
                A
              </div>
              <div className="text-left">
                <p className="font-medium text-sm sm:text-base">Admin</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
              <FiChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-20 h-screen pt-20 transition-transform duration-300 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:w-64 bg-gradient-to-b from-blue-900/20 to-gray-900 border-r border-gray-700 shadow-xl`}>
        
        <div className="h-full px-4 py-6 overflow-y-auto">
          {/* Close Button for Mobile */}
          <div className="flex justify-end md:hidden mb-4">
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-700 text-gray-300">
              ✕
            </button>
          </div>

          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => setActiveSection(item.name)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                    activeSection === item.name 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'hover:bg-blue-800/30 text-gray-300 hover:text-white'
                  }`}
                >
                  <span className={`${activeSection === item.name ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-200`}>
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-20 md:ml-64 transition-all duration-300">
        <div className="p-4 sm:p-6">
          
          {/* Welcome Header */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, Admin! 👋</h1>
                <p className="text-blue-100 text-sm sm:text-base">Here's what's happening with your platform today.</p>
              </div>
              <FiBarChart2 className="hidden sm:block w-10 h-10 text-white opacity-30" />
            </div>
          </div>

          {/* Stats Cards */}
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
                  <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
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
          



        </div>
      </main>


      
    </div>
  );
};

export default Dashboard;
